import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartCreatorService } from 'src/app/services/chart-creator.service';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';

@Component({
	selector: 'mrr-graph',
	templateUrl: './mrr-graph.component.html',
	styleUrls: ['./mrr-graph.component.css']
})
export class MrrGraphComponent implements OnInit {
	@ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
	private chart: Chart;
	@Input() mrrGraphData: ChartDataSets[];

	constructor(private chartCreatorService: ChartCreatorService) { }

	ngOnInit(): void {
		this.initializeChart();
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
