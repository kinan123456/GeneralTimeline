import { Injectable } from '@angular/core';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';

@Injectable({
    providedIn: 'root'
})
export class ChartCreatorService {
    	/**
	 * Creates and returns chart instance given its configurations.
	 * @param ctx Canvas where the chart rendering on.
	 * @param chartType Type of the chart
	 * @param chartOptions Chart options
	 * @param chartDataSets Chart data
	 */
	public createChartInstance(ctx: CanvasRenderingContext2D,
		chartType: string,
		chartOptions: ChartOptions,
		chartDataSets: ChartDataSets[]): Chart {

		return new Chart(ctx, {
			type: chartType,
			options: chartOptions,
			data: {
				datasets: chartDataSets,
			}
		});
	}
}