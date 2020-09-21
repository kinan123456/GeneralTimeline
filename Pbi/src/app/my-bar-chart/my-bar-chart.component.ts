import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../services/backend.service';
import 'chartjs-plugin-zoom';
import { BackendModel } from '../models/backend.model';
import { ChartDataSets, ChartLegendLabelItem, ChartOptions, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { ChartService } from '../services/chart.service';
import * as Chart from 'chart.js';

@Component({
	selector: 'app-my-bar-chart',
	templateUrl: './my-bar-chart.component.html',
	styleUrls: ['./my-bar-chart.component.css']
})
export class MyBarChartComponent implements OnInit, OnDestroy {
	private readonly subscription: Subscription;
	private readonly chartDataPointRadius: number;
	private readonly chartDataPointHeight: number;
	private readonly chartType: ChartType;
	private readonly chartDataSets: ChartDataSets[];
	private readonly defaultLegendClickHandler: (event: MouseEvent, legendItem: ChartLegendLabelItem) => void;
	private chartOptions: ChartOptions;
	private chart: Chart;
	private isChartDataHidden: boolean;
	private executionInfo: BackendModel;
	sectionSelectorChecked: boolean;
	mrrSelectButtonText: string;
	activeElements: number;
	@ViewChild('canvas',  { static: true }) canvas: ElementRef<HTMLCanvasElement>;

	/**
	 * Initializes field values.
	 * @param backendService Injectable service from root to be able to use its functions.
	 * @param chartService Injectable service from root to be able to use its functions.
	 */
	constructor(private backendService: BackendService,
		private chartService: ChartService) {

		this.subscription = new Subscription();
		this.chartDataSets = [];
		this.chartType = 'bubble';
		this.chartDataPointRadius = 5;
		this.chartDataPointHeight = 0.2;
		this.sectionSelectorChecked = true;
		this.isChartDataHidden = false;
		this.mrrSelectButtonText = 'Deselect All Mrrs';
		this.defaultLegendClickHandler = Chart.defaults.global.legend.onClick;
	}

	ngOnInit(): void {
		this.setupInitialChartOptions();
		this.subscribeToBackendData();
	}

	/**
	 * Subscribes to backend data, to what server sends.
	 * When data received, it loads it into chart and display to user.
	 */
	private subscribeToBackendData(): void {
		// Add child subscription.
		this.subscription.add(this.backendService.getRemoteData.subscribe((data: BackendModel) => {
			this.executionInfo = data;
			this.setupChartDatasets();
			this.setupChartOptions();
			this.initializeChart();
			this.updateActiveElementsCount();
		}));
	}

	/**
	 * Setup chart options, the zoom and pan capabailities, X and Y axis.
	 */
	private setupChartOptions(): void {
		this.setupChartOptionsScalesXAxes();
		this.setupChartOptionsScalesYAxes();
		this.setupChartOptionsPluginsRange();
	}

	/**
	 * Initial chart options like title text, chart layout, inital chart tooltips setup, etc.
	 * When data is received from server, other options are set because they're related to backend info.
	 */
	private setupInitialChartOptions(): void {
		this.chartOptions = {
			title: {
				display: true,
				text: 'Natal Execution'
			},
			responsive: true,
			// Declare 'scales' property in chartOptions object to be able to assign a value later.
			scales: {},
			// Implement 'onClick' mouse event (or touch event) method.
			onClick: (event: MouseEvent) =>
				this.chartService.onClickChartElement(event, this.chart.chartArea, this.executionInfo),
			legend: {
				display: true,
				position: 'bottom',
				onClick: (event: MouseEvent, legendItem: ChartLegendLabelItem) => {
					this.defaultLegendClickHandler(event, legendItem);
					this.updateActiveElementsCount();
				}
			},
			layout: {
				padding: {
					left: 50,
					right: 0,
					top: 0,
					bottom: 0
				}
			},
			plugins: {
				zoom: {
					pan: this.chartService.getInitialPanOptions,
					zoom: this.chartService.getInitialZoomOptions
				}
			}
		};

		this.setupChartOptionsTooltips();
	}

	private updateActiveElementsCount() {
		this.activeElements = this.chartService.getAvailableElementsCount(this.chart);
	}

	/**
	 * Sets options plugns rangeMax and rangeMin for panning and zooming.
	 * User cannot pan ("move" chart up-down or down-left) or zoom (in and out) more than rangeMax and
	 * less than rangeMin. This function is called after data has been receieved from backend, because
	 * each natal execution has different startTime and endTime values.
	 */
	private setupChartOptionsPluginsRange(): void {
		let chartOptionsPluginInstance = this.chartOptions.plugins.zoom;

		let rangeMin = {
			x: this.executionInfo.startTime,
			y: 0
		};

		let rangeMax = {
			x: this.executionInfo.endTime,
			y: this.chartService.getHighestYElement() + this.chartDataPointHeight
		};

		chartOptionsPluginInstance.zoom.rangeMin = rangeMin;
		chartOptionsPluginInstance.pan.rangeMin = rangeMin;
		chartOptionsPluginInstance.zoom.rangeMax = rangeMax;
		chartOptionsPluginInstance.pan.rangeMax = rangeMax;
	}

	/**
	 * Setup chart y-axis properties.
	 * Set min tick value to 0 and max value to last Y element value plus height of initial chart data point.
	 */
	private setupChartOptionsScalesYAxes(): void {
		this.chartOptions.scales.yAxes = [{
			display: false,
			ticks: {
				min: 0,
				max: this.chartService.getHighestYElement() + this.chartDataPointHeight
			}
		}];
	}

	/**
	 * Setup tooltips mouse onHover callback function.
	 */
	private setupChartOptionsTooltips(): void {
		this.chartOptions.tooltips = {
			enabled: true,
			callbacks: {
				label: (tooltipItem: Chart.ChartTooltipItem, data: Chart.ChartData) => {
					return this.chartService.getChartTooltipLabelCallback(tooltipItem, data);
				}
			},
		};
	}

	/**
	 * Setup scale x-axis properties.
	 * Set ticks min value to startTime of natal execution and max value to endTime.
	 * X-axis type is "time" in seconds unit.
	 */
	private setupChartOptionsScalesXAxes(): void {
		this.chartOptions.scales.xAxes = [
			{
				ticks: {
					min: this.executionInfo.startTime,
					max: this.executionInfo.endTime,
					autoSkip: true
				},
				type: 'time',
				time: {
					unit: 'second'
				},
				scaleLabel: {
					display: true,
					labelString: "Time"
				},
			}
		];
	}

	/**
	 * Load chart with info receieved from database which stored in 'executionInfo' variable that was
	 * initialized previously.
	 * Group all similar objects into same cell in a new array, for example: 'A' record at time 'X' in first
	 * cell of array, and 'A' record at time 'Y' in second cell of array, this function groups them up
	 * to be in same cell in new array.
	 * This will prevent duplicating legend label names that are displayed near graph.
	 */
	private setupChartDatasets(): void {
		const newArray = this.chartService.groupBy(this.executionInfo.records, 'name');

		Object.entries(newArray).forEach(([key, values]) => {
			// Loads backend records (event name, occurrence time) into chart, each as separated dataset.
			this.chartDataSets.push({
				// Get all dataset of the same key (name).
				data: this.chartService.getDatasetOfKey(values,
					this.chartDataPointHeight,
					this.chartDataPointRadius),
				// Prints key name and the count of it on graph.
				label: `${key} (#${values.length})`,
				backgroundColor: this.chartService.getRandomColor,
			});
		});
	}

	/**
	 * Initializes chart instance in canvas DOM 2d element.
	 */
	private initializeChart(): void {
		const ctx = this.canvas.nativeElement.getContext('2d');

		this.chart = this.chartService.createChartInstance(ctx,
			this.chartType,
			this.chartOptions,
			this.chartDataSets);
	}

	/**
	 * Toggle mode between "Zoom & Pan" mode and "Section Selector" mode.
	 * Zoom and pan lets user zoom in/out or move up/down and left/right in chart.
	 * Section selection lets user select desired part of graph to get better view of content.
	 */
	changeMode(): void {
		this.sectionSelectorChecked = !this.sectionSelectorChecked;
		const panOptions = this.chart.options.plugins.zoom.pan;
		const zoomOptions = this.chart.options.plugins.zoom.zoom;
		zoomOptions.drag = zoomOptions.drag ? false : this.chartService.getDragOptions;
		panOptions.enabled = !zoomOptions.drag;
		this.chart.update();
	}

	/**
	 * Handler of 'Reset chart view' button. This destroys the chart object and re-initializes it.
	 */
	resetChartView(): void {
		// Clean up any references stored to the chart object.
		this.chart.destroy();

		// Re-initialize chart.
		this.initializeChart();

		// Toggle radio button - Check 'Section Selector'.
		this.sectionSelectorChecked = true;

		this.mrrSelectButtonText = 'Deselect All Mrrs';
		this.updateActiveElementsCount();
	}

	/**
	 * Handler of 'Deselect MRR labels' button.
	 * This hides/unhides all chart point labels from graph.
	 */
	deselectMrrView(): void {
		this.isChartDataHidden = !this.isChartDataHidden;
		for (let i = 0; i < this.chart.data.datasets.length; i++) {
			const meta = this.chart.getDatasetMeta(i);
			meta.hidden = this.isChartDataHidden;
		}
		this.chart.update();

		this.mrrSelectButtonText = this.isChartDataHidden ? 'Select All Mrrs' : 'Deselect All Mrrs';
		this.updateActiveElementsCount();
	}

	/**
	 * Component destroys, observers unsubscribe and chart is destroyed.
	 */
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
		this.chart.destroy();
	}
}