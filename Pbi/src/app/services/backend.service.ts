import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimelineModel } from '../models/timeline.model';
import { EventModel } from '../models/event.model';
import { MrrModel } from '../models/mrr.model';
import { CoordinatesModel } from '../models/coordinates.model';
import { TrajectoryModel } from '../models/trajectory.model';
import * as trajectory from '../files/good.json';

@Injectable({
	providedIn: 'root'
})
export class BackendService {
	private timelineModel: TimelineModel;
	private generalTimelineData$: BehaviorSubject<TimelineModel>;
	private timelineEventsNames: string[];

	constructor() {
		this.timelineEventsNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
	'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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

		worldData.set(firstDate, [[{ X: 0, Y: 0, Z: 0 }, { X: 3, Y: 3, Z: 3 }], [{ X: 0.5, Y: 0.5, Z: 0.5 }, { X: 1, Y: 1, Z: 1 }]]);
		worldData.set(secondDate, [[{ X: 0, Y: 0, Z: 0 }, { X: 8, Y: 4, Z: 4 }], [{ X: 2, Y: 1, Z: 1 }, { X: 2, Y: 2, Z: 2 }]]);
		worldData.set(thirdDate, [[{ X: 0, Y: 0, Z: 0 }, { X: 6, Y: 3, Z: 6 }], [{ X: 1.5, Y: 1.5, Z: 1.5 }, { X: 1, Y: 3, Z: 3 }]]);
		worldData.set(thirdDate, [[
		{ X: 0.16317868820662662, Y: 0.18358049352624606, Z: 0.26689856976165005 },
		{ X: 0.5666464175262684, Y: -0.7519270064110799, Z: 0.688214496043783 },
		{ X: 0.9326871858209057, Y: -1.1412839126234329, Z: -0.594289220192715 },
		{ X: -0.7408887047034121, Y: -1.9506192605601678, Z: 0.07589557108293477 },
		{ X: -1.4354343014839444, Y: -2.081638923265614, Z: -1.8167214994961012 },
		{ X: 2.6569505648183536, Y: -1.395533591152667, Z: -0.7925119923757491 },
		{ X: 1.1624496903108323, Y: 2.371569121756211, Z: 2.7060068081642794 },
		{ X: 2.543016671931592, Y: 2.5424216550723218, Z: -2.646867943081168 },
		{ X: 0.16584571988526775, Y: 3.0222343379356547, Z: -3.317438107388649 },
		{ X: 2.093711175887054, Y: 4.1942279168694085, Z: -3.7031511361957756 },
		{ X: 1.3812384930543198, Y: 0.09253139408790167, Z: -4.577186741467999 },
		{ X: -2.0711049567108395, Y: 4.883830954073354, Z: -4.887461253410779 },
		{ X: 1.9325925992598836, Y: -2.8097698620554947, Z: -6.330602381067807 },
		{ X: -4.242582774490468, Y: 3.3932727018256346, Z: 4.337896789202476 },], [{ X: -0.15920696121526834, Y: -0.14426218384424938, Z: -0.08284509152593911 },
		{ X: -0.7374480220076685, Y: -0.8843920745078802, Z: -0.4205895188518374 },
		{ X: -0.2635286460608247, Y: -1.2657384942198302, Z: 1.0000039319110698 },
		{ X: -1.9427890736188451, Y: 1.058475152158329, Z: -0.6359851022151504 },
		{ X: -1.4429507599879314, Y: 0.3007853434895752, Z: -1.291219552201766 },
		{ X: 1.7856735806645718, Y: -1.3042252369342733, Z: 0.008926620460854018 },
		{ X: 3.279052312841949, Y: 0.3552062730013643, Z: 0.6897334359827605 },
		{ X: 0.4879512898629006, Y: -2.6666711856988803, Z: -1.4751088073465555 },
		{ X: 0.9009184194408203, Y: -3.5006834156278006, Z: -0.18799661592466566 },
		{ X: 3.330552311696805, Y: 1.1309534843763414, Z: -2.817788342404911 },
		{ X: -5.248153093180127, Y: 4.9585829756224165, Z: -0.6585738957583596 },
		{ X: 5.152567960475957, Y: 5.6378705078348474, Z: -3.4810016393950107 },
		{ X: 1.0996054445172254, Y: -0.4365745360799338, Z: -5.2574774418994075 },
		{ X: -0.6501638913992995, Y: 4.281246395990746, Z: 3.4789471550478934 },
		{ X: -0.4934008490974523, Y: 0.010349643817466059, Z: -0.3635671589940688 },
		{ X: -0.8434000369164012, Y: 0.5536467808221328, Z: -0.4009983542033635 },
		{ X: -0.11313778022476184, Y: -0.36002476435296693, Z: -0.13083453852191773 },
		{ X: 1.810374428756429, Y: -0.4217106299005011, Z: 1.0082200908808154 },
		{ X: 1.1514555507152506, Y: -0.3068883459100119, Z: 0.32852720467500984 },
		{ X: -1.1852879959971496, Y: 2.253814049698964, Z: 2.1951711066847723 },
		{ X: 2.6054272640271217, Y: 3.3371239983439454, Z: 0.04432999201329013 },
		{ X: 3.9482533921725897, Y: -3.5799182895713724, Z: 2.0309270058977846 },
		{ X: -2.01309376250257, Y: 0.7524398206770478, Z: 0.37934441737693836 },
		{ X: 3.0414400615165182, Y: 0.7378332841349355, Z: 2.882982768585194 },
		{ X: -1.5826546817641107, Y: 3.2007371379142224, Z: -3.6000694721052753 },
		{ X: -4.732312643013002, Y: -4.886791088516704, Z: -2.344836268423778 },
		{ X: 2.6981805549440034, Y: -6.0872321728440895, Z: -1.0263711155751416 },
		{ X: -2.8777200504866842, Y: 6.362873408923292, Z: -4.896605715890517 },
		{ X: -0.09598770600757633, Y: 0.17584279792175495, Z: 0.09203210303418108 },
		{ X: 0.339032753425885, Y: -0.269246436631851, Z: -0.040096231370719604 },
		{ X: -0.18168072076123587, Y: 0.36875272329853204, Z: 0.8780217212874469 },
		{ X: -1.073687944142347, Y: -0.10748042833689686, Z: 1.9150687555841448 },
		{ X: 1.8287126161279654, Y: 1.976748879456014, Z: 1.861675665514796 },
		{ X: 1.3378944463687223, Y: 1.44121286103272, Z: 2.51696347579231 },
		{ X: -3.1352589226297707, Y: -2.667252053481173, Z: -2.5353126291518517 },
		{ X: -3.1041010669008138, Y: -0.5933561756160204, Z: -0.12625372325233197 },
		{ X: -1.291217198776108, Y: -0.9718103325366378, Z: 0.5973387449170598 },
		{ X: -0.8674793904644651, Y: -2.4679599291469656, Z: 4.908812819544545 },
		{ X: -0.27118206121273625, Y: -4.917682606892061, Z: 3.1844359001679017 },
		{ X: 5.9854533598328645, Y: 4.786873961419163, Z: -4.667199172819586 },
		{ X: 1.2705662341019484, Y: 0.5747397325269485, Z: 1.3998277927723084 },
		{ X: -6.698396016626319, Y: -3.957754296675924, Z: 4.045609213284235 },]]);

		// TODO: get data from server
		return {
			mrrId: 1,
			mrrType: 'pd',
			startTime: new Date(),
			endTime: new Date(),
			worldData: worldData
		}
	}

	public get requestTrajectoryData() : TrajectoryModel[] {
		return trajectory.default;
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
		
		// All data but different times.
		this.timelineEventsNames.forEach(name => {
			recordsModels.push({
				mrrId: i,
				name: name,
				occurrenceTime: new Date("2020-9-13 13:13:" + (Math.random() * 10))
			});
		});

		for (let j = 0; j < 80; j++) {
			this.timelineEventsNames.forEach(name => {
				recordsModels.push({
					mrrId: i,
					name: name,
					occurrenceTime: new Date("2020-9-13 13:13:" + (Math.random() * 10))
				});
			});
		}

		return recordsModels;
	}

	// Dummy Start Datetime that we get from server.
	private get getTimelineStartTime(): Date {
		return new Date("2020-9-13 13:13:00");
	}

	// Dummy End Datetime that we get from server.
	private get getTimelineEndTime(): Date {
		return new Date("2020-9-13 13:13:35");
		// return new Date();
	}
}