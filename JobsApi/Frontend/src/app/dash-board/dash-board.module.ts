import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { MaterialModule } from "src/app/material/material.module";
import { AppRoutingModule } from "src/app/app-routing.module";
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { AddJobComponent } from './add-job/add-job.component';
import { ProfileComponent } from './profile/profile.component';
import { StatsComponent } from './stats/stats.component';
import { SharedModule } from "src/app/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { EditJobComponent } from './edit-job/edit-job.component';
import { AngularResizeEventModule } from 'angular-resize-event';


@NgModule({
  declarations: [
    DashBoardComponent,
    AllJobsComponent,
    AddJobComponent,
    ProfileComponent,
    StatsComponent,
    EditJobComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule, 
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AngularResizeEventModule
  ]
})
export class DashBoardModule { }
