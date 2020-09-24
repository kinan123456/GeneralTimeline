import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trajectory',
  templateUrl: './trajectory.component.html',
  styleUrls: ['./trajectory.component.css']
})
export class TrajectoryComponent implements OnInit {

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

  paths = [{time: 111, path1:[{x: 0, y: 0}, {x: 1, y: 16}, {x: 2, y: 23}, {x: 3, y: 26}], path2:[{x: 0, y: 0}, {x: 1, y: 14}, {x: 2, y: 20}, {x: 3, y: 21}]}, 
           {time: 112, path1:[{x: 0, y: 0}, {x: 1, y: 25}, {x: 2, y: 32}, {x: 3, y: 37}], path2:[{x: 0, y: 0}, {x: 1, y: 20}, {x: 2, y: 26}, {x: 3, y: 26.3}]},
           {time: 113, path1:[{x: 0, y: 0}, {x: 1, y: 26}, {x: 2, y: 35}, {x: 3, y: 40}], path2:[{x: 0, y: 0}, {x: 1, y: 16}, {x: 2, y: 23}, {x: 3, y: 25}]}]

  chartType = "scatter";
  chartLegend = true;

  chartData = [
    {data: this.paths[0].path1, label: 'origin', showLine: true, fill: false, borderColor: 'red', borderWidth: 1},
    {data: this.paths[0].path2, label: 'actual', showLine: true, fill: false, borderColor: 'green', borderWidth: 1}
  ]

  constructor() { 
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
