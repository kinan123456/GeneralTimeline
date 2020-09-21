import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BackendModel } from '../models/backend.model';
import { RecordModel } from '../models/record.model';

@Injectable({
	providedIn: 'root'
})
export class BackendService {
	private backendModel: BackendModel;
	private remoteData$: BehaviorSubject<BackendModel>;
	private recordsNames: string[];

	constructor() {
		this.recordsNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
			'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];	

		this.remoteData$ = new BehaviorSubject<BackendModel>(undefined);
		this.setupBackendData();
		this.remoteData$.next(this.backendModel);
	}

	public get getRemoteData(): Observable<BackendModel> {
		return this.remoteData$.asObservable();
	}

	private setupBackendData(): void {
		this.backendModel = {
			startTime: this.getStartDate,
			endTime: this.getEndDate,
			records: this.getSignificantRecords
		}
	}

	private get getSignificantRecords(): RecordModel[] {
		let recordsModels: RecordModel[] = [];
		let i = 2;

		// All data on 13:13:02 time.
		this.recordsNames.forEach(name => {
			recordsModels.push({
				mrrId: i,
				name: name,
				occurrenceTime: new Date("2020-9-13 13:13:" + (i))
			});
		});

		i++;
		// All data on 13:13:03 time.
		this.recordsNames.forEach(name => {
			recordsModels.push({
				mrrId: i,
				name: name,
				occurrenceTime: new Date("2020-9-13 13:13:" + (i))
			});
		});

		i++;
		// Duplicate 'A' records all on same time - 13:13:04.
		this.recordsNames.forEach(name => {
			recordsModels.push({
				mrrId: i,
				name: 'A',
				occurrenceTime: new Date("2020-9-13 13:13:" + (i))
			});
		});

		// All data but different times.
		this.recordsNames.forEach(name => {
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