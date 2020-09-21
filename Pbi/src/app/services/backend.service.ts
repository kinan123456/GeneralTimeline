 import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimelineModel } from '../models/timeline.model';
import { EventModel } from '../models/event.model';

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
		this.setupBackendData();
		this.generalTimelineData$.next(this.timelineModel);
	}

	public get getRemoteData(): Observable<TimelineModel> {
		return this.generalTimelineData$.asObservable();
	}

	private setupBackendData(): void {
		this.timelineModel = {
			startTime: this.getStartDate,
			endTime: this.getEndDate,
			records: this.getSignificantRecords
		}
	}

	private get getSignificantRecords(): EventModel[] {
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
	private get getStartDate(): Date {
		return new Date("2020-9-13 13:13:00");
	}

	// Dummy End Datetime that we get from server.
	private get getEndDate(): Date {
		return new Date("2020-9-13 13:13:35");
	}
}