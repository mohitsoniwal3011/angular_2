import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { JobInfoCardComponent } from './job-info-card/job-info-card.component';
import { MaterialModule } from "src/app/material/material.module";
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';



@NgModule({
  declarations: [
    NavBarComponent,
    JobInfoCardComponent,
    SnackBarComponent,
    PieChartComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
    
  ],
  exports :[
    NavBarComponent,
    JobInfoCardComponent,
    PieChartComponent
  ], 
})
export class SharedModule { }
