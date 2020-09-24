import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { CoordinatesModel } from 'src/app/models/coordinates.model';
import { MrrModel } from 'src/app/models/mrr.model';
import { BackendService } from 'src/app/services/backend.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
	selector: 'app-mrr-view',
	templateUrl: './mrr-view.component.html',
	styleUrls: ['./mrr-view.component.css']
})
export class MrrViewComponent implements OnInit {
	private currentMrrTime: Date;
	private mrrData: MrrModel;
	mrrGraphData: ChartDataSets[];

	constructor(private backendService: BackendService, private utilsService: UtilsService) {
		this.mrrData = this.backendService.requestMrrData;
		// TODO: Make sure that map entries are sorted so next and previous buttons work correctly
	}

	ngOnInit(): void {
		// Get real data from controller
		this.currentMrrTime = [...this.mrrData.worldData.keys()][0]
		this.mrrGraphData = this.mrrDataToGraph(this.getWorldDataAtTime(this.currentMrrTime));
	}

	/**
	 * Gets the time of the i-th following mrr and sets the CurrentMrrTime to it
	 */
	moveMrr(i: number) {
		let worldDataTimes = [...this.mrrData.worldData.keys()];
		this.currentMrrTime = worldDataTimes[(worldDataTimes.indexOf(this.currentMrrTime) + i + worldDataTimes.length) % worldDataTimes.length];
		this.mrrGraphData = this.mrrDataToGraph(this.getWorldDataAtTime(this.currentMrrTime));
	}

	/**
	 * Gets the coordinates of all S and M at the input time from the mrrData
	 */
	private getWorldDataAtTime(worldTime: Date): [CoordinatesModel[], CoordinatesModel[]] {
		// If the mrr doesnt contain data for the input time, find the previus time point
		if (!this.mrrData.worldData.has(worldTime)) {
			var temp = [...this.mrrData.worldData.keys()].map(d => Math.abs(worldTime.getTime() - d.getTime()));
			var idx = temp.indexOf(Math.min(...temp));
			worldTime = [...this.mrrData.worldData.keys()][idx];
		}

		return this.mrrData.worldData.get(worldTime)
	}

	/**
	 * Initializes graph data with world data extracteed from the mrr
	 */
	private mrrDataToGraph(currentWorldData: [CoordinatesModel[], CoordinatesModel[]]): ChartDataSets[] {
		return [{
			label: 'M',
			backgroundColor: 'red',
			radius: 30,
			data: currentWorldData[0].map(coordinate => {
				return { x: coordinate.X, y: coordinate.Y }
			})
		}, {
			label: 'E',
			backgroundColor: 'yellow',
			radius: 30,
			data: currentWorldData[1].map(coordinate => {
				return { x: coordinate.X, y: coordinate.Y }
			})
		}];
	}

}
