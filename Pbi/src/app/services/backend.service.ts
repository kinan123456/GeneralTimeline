 import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimelineModel } from '../models/timeline.model';
import { EventModel } from '../models/event.model';
import { MrrModel } from '../models/mrr.model';
import { CoordinatesModel } from '../models/coordinates.model';

@Injectable({
	providedIn: 'root'
})
export class BackendService {
	private timelineModel: TimelineModel;
	private generalTimelineData$: BehaviorSubject<TimelineModel>;
	private timelineEventsNames: string[];

	constructor() {
		this.timelineEventsNames = ['A', 'B', 'C'];

		this.generalTimelineData$ = new BehaviorSubject<TimelineModel>(undefined);
		this.setupTimelineModel();
		this.generalTimelineData$.next(this.timelineModel);
	}

	public get getRemoteData(): Observable<TimelineModel> {
		return this.generalTimelineData$.asObservable();
	}

	public get requestMrrData(): MrrModel {
		let worldData: Map<Date, [CoordinatesModel[], CoordinatesModel[]]> = new Map();
		let firstDate = new Date();
		firstDate.setHours(0);
		firstDate.setMinutes(0);
		firstDate.setSeconds(0);

		let secondDate = new Date();
		secondDate.setHours(5);
		secondDate.setMinutes(5);
		secondDate.setSeconds(5);

		let thirdDate = new Date();
		thirdDate.setHours(10);
		thirdDate.setMinutes(10);
		thirdDate.setSeconds(10);

		worldData.set(firstDate, [[{X: 0, Y: 0, Z:0}, {X: 3, Y:3, Z:3}], [{X: 0.5, Y: 0.5, Z:0.5}, {X: 1, Y:1, Z:1}]]);
		worldData.set(secondDate, [[{X: 0, Y: 0, Z:0}, {X: 8, Y:4, Z:4}], [{X: 2, Y: 1, Z:1}, {X: 2, Y:2, Z:2}]]);
		worldData.set(thirdDate, [[{X: 0, Y: 0, Z:0}, {X: 6, Y:3, Z:6}], [{X: 1.5, Y: 1.5, Z:1.5}, {X: 1, Y:3, Z:3}]]);
		// TODO: get data from server
		return {
			mrrId: 1,
			mrrType: 'pd',
			startTime: new Date(),
			endTime: new Date(),
			worldData: worldData
		}
	}

	private setupTimelineModel(): void {
		this.timelineModel = {
			startTime: this.getTimelineStartTime,
			endTime: this.getTimelineEndTime,
			records: this.getTimelineEventsList
		}
	}

	private get getTimelineEventsList(): EventModel[] {
		let recordsModels: EventModel[] = [];
		let i = 2;

		// All data on 13:13:02 time.
		this.timelineEventsNames.forEach(name => {
			recordsModels.push({
				mrrId: i,
				name: name,
				occurrenceTime: new Date("2020-9-13 13:13:" + (i))
			});
		});

		i++;
		// All data on 13:13:03 time.
		this.timelineEventsNames.forEach(name => {
			recordsModels.push({
				mrrId: i,
				name: name,
				occurrenceTime: new Date("2020-9-13 13:13:" + (i))
			});
		});

		i++;
		// Duplicate 'A' records all on same time - 13:13:04.
		this.timelineEventsNames.forEach(name => {
			recordsModels.push({
				mrrId: i,
				name: 'A',
				occurrenceTime: new Date("2020-9-13 13:13:" + (i))
			});
		});

		// All data but different times.
		this.timelineEventsNames.forEach(name => {
			recordsModels.push({
				mrrId: i,
				name: name,
				occurrenceTime: new Date("2020-9-13 13:13:" + (i++))
			});
		});


		return recordsModels;
	}

	// Dummy Start Datetime that we get from server.
	private get getTimelineStartTime(): Date {
		return new Date("2020-9-13 13:13:00");
	}

	// Dummy End Datetime that we get from server.
	private get getTimelineEndTime(): Date {
		return new Date("2020-9-13 13:13:35");
	}
}