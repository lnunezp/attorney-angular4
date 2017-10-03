import { Component, AfterViewInit } from '@angular/core';

// import { TrafficChartService } from './trafficChart.service';
import { TrafficChartService } from '../../../_services/index';
import * as Chart from 'chart.js';

@Component({
  selector: 'nga-traffic-chart',
  templateUrl: './trafficChart.html',
  styleUrls: ['./trafficChart.scss'],
})

// TODO: move chart.js to it's own component
export class TrafficChart implements AfterViewInit {
  doughnutData: any;
  data: any;

  constructor(
    private trafficChartService: TrafficChartService,
  ) { }

  ngAfterViewInit() {
      this.loadData();
  }

  loadData() {
    this.trafficChartService.loadData()
    .subscribe((data) => {
        this.doughnutData = data.items;
        this._loadDoughnutCharts();
      });
  }

  private _loadDoughnutCharts() {
    const el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
    new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true,
    });
  }
}
