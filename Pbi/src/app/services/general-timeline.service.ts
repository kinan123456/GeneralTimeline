import { Injectable } from '@angular/core';
import { Chart, ChartArea, ChartData, ChartDataSets, ChartOptions, ChartPoint, ChartTooltipItem } from 'chart.js';
import { TimelineModel } from '../models/timeline.model';
import { EventModel } from '../models/event.model';

@Injectable({
	providedIn: 'root'
})
export class GeneralTimelineService {
	private readonly differenceYHeights: number
	private readonly dragOptions: {};
	private yMaxValues: Map<number, number>;
	private lastHoveredIndex: number;
	private lastHoveredTooltipItem: ChartTooltipItem;
	private lastHoveredChartData: ChartData;

	constructor() {
		this.dragOptions = {
			animationDuration: 1000,
			borderColor: 'rgba(225,225,225,0.3)',
			borderWidth: 5,
			backgroundColor: 'rgb(225,225,225)',
		};

		this.differenceYHeights = 0.02;
		this.yMaxValues = new Map<number, number>();
	}

	/**
	 * Returns the highest Y value chart element.
	 */
	public getHighestYElement(): number {
		return Math.max(...this.yMaxValues.values());
	}

	public updateMaxHeightOfXLabel(dateTime: Date, initalHeight: number): void {
		if (!this.yMaxValues.has(dateTime.getTime())) {
			this.yMaxValues.set(dateTime.getTime(), initalHeight);
		} else {
			const val = this.yMaxValues.get(dateTime.getTime());
			this.yMaxValues.set(dateTime.getTime(), val + this.differenceYHeights);
		}
	}

	/**
	 * On mouse hover returns the name of the item and its X-axis value.
	 * @param tooltipItem Item the mouse pointing on
	 * @param data All chart data.
	 */
	public getChartTooltipLabelCallback(tooltipItem: ChartTooltipItem, data: ChartData): string | string[] {
		// Save last hovered item for later use.
		this.lastHoveredIndex = tooltipItem.datasetIndex;
		this.lastHoveredTooltipItem = tooltipItem;
		this.lastHoveredChartData = data;

		// Get item label name from datasets at hovered index.
		const label = data.datasets[this.lastHoveredIndex].label;
		const xLabel = tooltipItem.xLabel.toString();

		return label + ': ' + xLabel;
	}

	public getAvailableElementsCount(chart: Chart): number {
		let count = 0;
		for (let i = 0; i < chart.data.datasets.length; i++) {
			let datasetMeta = chart.getDatasetMeta(i);
			count += datasetMeta.hidden ? 0 : datasetMeta.data.length;
		}
		return count;
	}

	/**
	 * On click mouse event.
	 * Pops up an alert message with item record information.
	 * @param event Mouse click event
	 * @param chartArea Chart area
	 * @param executionInfo Backend data
	 */
	public onClickChartElement(event: MouseEvent, chartArea: ChartArea, executionInfo: TimelineModel): void {
		const { left, right, top, bottom } = chartArea;
		if (
			event.offsetX > left &&
			event.offsetX < right &&
			event.offsetY > top &&
			event.offsetY < bottom &&
			this.lastHoveredIndex >= 0
		) {
			// Store element clicked name.
			let clickedElementName = this.lastHoveredChartData.datasets[this.lastHoveredIndex].label;
			// Store element x-axis value.
			let clickedElementXLabel = new Date(this.lastHoveredTooltipItem.xLabel.toString()).toLocaleString();

			// Pop up message the relative record model that clicked element represents.
			this.displayRecordModelByChartData(clickedElementName, clickedElementXLabel, executionInfo);

			// Reset last-hovered variables.
			this.lastHoveredIndex = undefined;
			this.lastHoveredTooltipItem = undefined;
			this.lastHoveredChartData = undefined;
		}
	}

	/**
	 * Initial options of pan plugin.
	 */
	public get getInitialPanOptions(): {} {
		return {
			// Initial boolean value to disable panning.
			enabled: false,
			// Panning directions.
			mode: 'xy',
			speed: 10,
			// Minimal pan distance required before actually applying pan
			threshold: 10,
		}
	}

	/**
	 * Initial options of zoom plugin.
	 */
	public get getInitialZoomOptions(): {} {
		return {
			enabled: true,
			drag: this.dragOptions,
			speed: 0.05,
			threshold: 2,
			sensitivity: 0.3
		}
	}

	/**
	 * Returns drag options.
	 */
	public get getDragOptions(): {} {
		return this.dragOptions;
	}

	/**
	 * Generates and returns a random color.
	 */
	public get getRandomColor(): string {
		return '#' + Math.random().toString(16).substr(-6);
	}

	/**
	 * Groups elements from 'arr' array by 'property' value.
	 * @param arr Array of elements
	 * @param property The property to group by
	 */
	public groupBy<T>(arr: Array<T>, property: string): { [key: string]: Array<T> } {
		return arr.reduce((acc, cur) => {
			acc[cur[property]] = [...acc[cur[property]] || [], cur];
			return acc;
		}, {});
	}

	/**
	 * Loads records of backend model into chart points.
	 * Each chart point has 3 properties: X axis value, Y axis value and radius of the bubble.
	 * If two chart points have the same X value, they are not drawn on same Y but a lil bit higher, so that
	 * user can see all data rather than overlapping.
	 * @param recordsList Record models array with the same name property value.
	 */
	public getDatasetOfKey(recordsList: EventModel[],
		initialChartPointHeight: number,
		pointRadius: number): ChartPoint[] {

		let datasets: ChartPoint[] = [];
		recordsList.forEach((record: EventModel) => {
			this.updateMaxHeightOfXLabel(record.occurrenceTime, initialChartPointHeight);
			datasets.push({
				x: record.occurrenceTime,
				y: this.yMaxValues.get(record.occurrenceTime.getTime()),
				r: pointRadius
			});
		});

		return datasets;
	}

	/**
	 * Gets chart point element local values like name and x-axis value and returns the related record model
	 * from 'exectionInfo' exeuction info backend-model.
	 * @param clickedElementName Name of the chart element
	 * @param clickedElementXLabel X-axis value of the chart element
	 * @param executionInfo Execution info data.
	 */
	private displayRecordModelByChartData(clickedElementName: string,
		clickedElementXLabel: string,
		executionInfo: TimelineModel): void {

		// Each label has its name appended with "(#X)" to describe total active count keys on graph.
		// Filter last string to get the item name only without any additional information. 
		let filteredElementName = this.getStringTillCharacter(clickedElementName);

		// Get records that has same name of 'filteredElementName'.
		let recordsWithSameName = executionInfo.records.filter((record: EventModel) => record.name === filteredElementName);
		// Get records that has same x-axis value (same date).
		let matchingRecords = recordsWithSameName.filter(
			(record: EventModel) => clickedElementXLabel === record.occurrenceTime.toLocaleString()
		);

		// Display record model that represents the chart element.
		let strResult = '';
		matchingRecords.forEach(r => {
			// Display MRR id, name and record occurrence time.
			strResult += `MRR id: ${r.mrrId}, Name: ${r.name}, Time: ${clickedElementXLabel}\n`;
		});

		alert(strResult);
	}

	/**
	 * Gets string and character and returns the sub-string of real string till first occurrence of char.
	 * @param str Real string
	 * @param char Character separator
	 */
	private getStringTillCharacter(str: string, char = '('): string {
		return str.split(char).shift().slice(0, -1);
	}
}