import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexAxisChartSeries } from 'ng-apexcharts';

@Component({
  selector: 'app-metrics-card',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './metrics-card.component.html',
  styleUrls: ['./metrics-card.component.scss']
})
export class MetricsCardComponent implements OnInit {
  @Input() title!: string;
  @Input() value!: string | number;
  @Input() series!: ApexAxisChartSeries;
  
  chartOptions: any = {};

  ngOnInit() {
    this.chartOptions = {
      series: this.series || [{
        name: 'Value',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }],
      chart: {
        type: 'area',
        height: 90,
        sparkline: {
          enabled: true
        },
        toolbar: {
          show: false
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 90, 100]
        }
      },
      colors: ['#1c2c3d'],
      dataLabels: {
        enabled: false
      },
      grid: {
        show: false
      },
      xaxis: {
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      tooltip: {
        enabled: false
      }
    };
  }
} 