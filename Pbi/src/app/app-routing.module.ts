import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralTimelineComponent } from './components/general-timeline/general-timeline.component';
import { MrrViewComponent } from './components/mrr-view/mrr-view.component';
import { TrajectoryComponent } from './components/trajectory/trajectory.component';


const routes: Routes = [
  { path: 'general-timeline', component: GeneralTimelineComponent },
  { path: 'mrr-view', component: MrrViewComponent },
  { path: 'trajectory', component: TrajectoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
