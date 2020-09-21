import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { GeneralTimelineComponent } from './components/general-timeline/general-timeline.component';
import { MrrViewComponent } from './components/mrr-view/mrr-view.component';
import { TrajectoryComponent } from './components/trajectory/trajectory.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralTimelineComponent,
    MrrViewComponent,
    TrajectoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
