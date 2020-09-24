import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { ChartCreatorService } from 'src/app/services/chart-creator.service';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';

@Component({
	selector: 'mrr-graph',
	templateUrl: './mrr-graph.component.html',
	styleUrls: ['./mrr-graph.component.css']
})
export class MrrGraphComponent implements OnInit, OnChanges {
	@ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
	@Input() mrrGraphData: ChartDataSets[];
	private chart: Chart;

	constructor(private chartCreatorService: ChartCreatorService) { }

	ngOnInit(): void {
		this.initializeChart();
	}

	ngOnChanges(changes: { [property: string]: SimpleChange }){
		if (this.chart) {
			let change: SimpleChange = changes['mrrGraphData']; 
			this.mrrGraphData = change.currentValue;
			this.chart.data.datasets = this.mrrGraphData;
			this.chart.update();
		}
	}

	private initializeChart() {
		const ctx = this.canvas.nativeElement.getContext('2d');

		this.chart = this.chartCreatorService.createChartInstance(
			ctx,
			'scatter',
			{
				scales: {
					xAxes: [{
						type: 'linear',
						position: 'bottom'
					}]
				},
			},
			this.mrrGraphData
		);
	}
}
