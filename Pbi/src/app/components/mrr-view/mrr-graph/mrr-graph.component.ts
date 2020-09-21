import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartCreatorService } from 'src/app/services/chart-creator.service';

@Component({
	selector: 'app-mrr-graph',
	templateUrl: './mrr-graph.component.html',
	styleUrls: ['./mrr-graph.component.css']
})
export class MrrGraphComponent implements OnInit {
	@ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
	private chart: Chart;

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
				}
			},
			[{
				label: 'Scatter Dataset',
				data: [{
					x: -10,
					y: 0
				}, {
					x: 0,
					y: 10
				}, {
					x: 10,
					y: 5
				}]
			}]
		);
	}

}



/**
 * var scatterChart = new Chart(ctx, {
	type: 'scatter',
	data: {
		datasets: [{
			label: 'Scatter Dataset',
			data: [{
				x: -10,
				y: 0
			}, {
				x: 0,
				y: 10
			}, {
				x: 10,
				y: 5
			}]
		}]
	},
	options:
	}
});
 *
 */