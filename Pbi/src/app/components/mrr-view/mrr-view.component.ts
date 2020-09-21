import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';

@Component({
	selector: 'app-mrr-view',
	templateUrl: './mrr-view.component.html',
	styleUrls: ['./mrr-view.component.css']
})
export class MrrViewComponent implements OnInit {

	mrrGraphData: ChartDataSets[];
	private mrrTime: Date;

	constructor() { }

	ngOnInit(): void {
		// Get real data from controller
		this.mrrGraphData = this.getMrrData();
		this.mrrTime = new Date("13:13:20");
	}

	/**
	 * TODO: Get real data from controller here
	 * TODO: Move to Service - SOLID
	 */
	private getMrrData(): ChartDataSets[] {
		return [{
			label: 'M',
			backgroundColor: 'red',
			radius: 30,
			data: [{
				x: -5,
				y: -5,
			}, {
				x: 5,
				y: 5
			}, {
				x: 0,
				y: 0
			}]
		}, {
			label: 'E',
			backgroundColor: 'yellow',
			radius: 30,
			data: [{
				x: -1,
				y: -1
			}, {
				x: 1,
				y: 1
			}, {
				x: 0.5,
				y: 0.5
			}]
		}];
	}

}
