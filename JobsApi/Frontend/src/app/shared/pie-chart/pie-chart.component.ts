import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import  Chart  from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, AfterViewInit {
  @Input() chartId : any;
  @Input()  chartType : any ='line';
  @Input() data : any;
  @Input() labels : any;
  @Input() backgound : any;
  
  constructor() {}

  ngAfterViewInit(): void {
    var myChart = new Chart(this.chartId, {
      type: this.chartType,
      data: {
          labels: this.labels,
          datasets: [{
              label: 'No. of jobs',
              data: this.data,
              backgroundColor: 'rgb(100, 92, 255, 0.7)',
              borderWidth: 3,
              borderRadius : 5, 
              barThickness : 80, 
              fill : true, 
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true, 
            scales: {
              y: {
                    beginAtZero: true
                }
              }, 
              tension : 0.5,
      }
  });
  
  }
  ngOnInit(): void {
    
  }

}
