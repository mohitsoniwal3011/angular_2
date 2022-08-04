import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { LoginComponent } from './authorization/login/login.component';
import { SignupComponent } from './authorization/signup/signup.component';
import { AddJobComponent } from './dash-board/add-job/add-job.component';
import { AllJobsComponent } from './dash-board/all-jobs/all-jobs.component';
import { DashBoardComponent } from './dash-board/dash-board/dash-board.component';
import { ProfileComponent } from './dash-board/profile/profile.component';
import { StatsComponent } from './dash-board/stats/stats.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { DashBoardModule } from "src/app/dash-board/dash-board.module";
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';
import { Chart } from 'chart.js';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponentComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashBoardComponent,
    canActivate: [AuthGuardGuard],
    pathMatch:'prefix',
    children : [
      {
        path: '', 
        component : StatsComponent
      },
      {
        path: 'stats',
        redirectTo : ''
      },
      {
        path: 'jobs',
        component : AllJobsComponent
      },
      {
        path : 'add-job', 
        component : AddJobComponent
      },
      {
        path : 'profile', 
        component : ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
