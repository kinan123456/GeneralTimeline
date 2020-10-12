import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-trajectory',
  templateUrl: './trajectory.component.html',
  styleUrls: ['./trajectory.component.css']
})
export class TrajectoryComponent implements OnInit {

  public paths;

  slider;

  chartOptions = {
    animation:{
      duration: 0
    },
    responsive: true,
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  }

  chartType = "scatter";
  chartLegend = true;

  public chartData;

  timeMin;
  timeMax;

  constructor(private backendService: BackendService) { 
	this.paths = this.backendService.requestTrajectoryData;
	this.chartData = [
		{data: this.paths[0].path1, label: 'origin', showLine: true, fill: false, borderColor: 'red', borderWidth: 1},
		{data: this.paths[0].path2, label: 'actual', showLine: true, fill: false, borderColor: 'green', borderWidth: 1}
	  ];
	this.timeMin = this.paths[0].time;
	this.timeMax = this.paths[this.paths.length - 1].time;
  }

  ngOnInit(): void {
    this.slider = document.getElementById('timeSlider');
    this.slider.addEventListener('input', (e) => {
      let path = this.paths.find((pathe) => pathe.time == e.target.value)
      this.chartData = [
        {data: path.path1, label: 'origin', showLine: true, fill: false, borderColor: 'red', borderWidth: 1},
        {data: path.path2, label: 'actual', showLine: true, fill: false, borderColor: 'green', borderWidth: 1}
      ]
    });
  }


}
