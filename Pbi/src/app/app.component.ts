import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimelineModel } from './models/timeline.model';
import { BackendService } from './services/backend.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'Pbi';
	private subscription: Subscription;
	constructor(private backendService: BackendService) {}

	ngOnInit(): void {
		this.subscription = new Subscription();
		this.subscription.add(this.backendService.getRemoteData.subscribe((dataModel: TimelineModel) => {
			console.log('got data:', dataModel);
		}));
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
