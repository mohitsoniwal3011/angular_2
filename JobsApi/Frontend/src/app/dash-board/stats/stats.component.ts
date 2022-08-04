import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Job } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  pending: number = 0;
  declined: number = 0;
  interview: number = 0;
  fullTime: number = 0;
  partTime: number = 0;
  internship: number = 0;
  remote: number = 0;

  statusData: any;
  statusBackGround : any ;
  statusLabels: any;
  statusChartId : any;
  statusChartType : any;

  jobTypeData : any;
  jobTypeLabels : any;
  jobTypeBackGround : any;
  jobTypeChartId : any;
  jobTypeChartType: any;

  background: any;
  chartId: any;
  chartType: any;
  isLoaded: boolean = false;

  type = new FormControl(['bar']);
  constructor(
    private userService: UserService, 
    private fb : FormBuilder
    ) {
    this.userService.getAllJobs().subscribe(res => {
      res.jobs.forEach(job => {
        this.findAnalytics(job)

        this.statusData = [this.interview, this.pending, this.declined]
        this.statusLabels = ['Interview', 'Pending', 'Declined'];
        this.statusBackGround = ['blue', 'red', 'yellow'];
        this.statusChartId = 'status'
        this.statusChartType = 'line'

        this.jobTypeData = [this.fullTime, this.partTime, this.internship, this.remote]
        this.jobTypeLabels = ['Full Time', 'Part Time', 'Internships', 'Remote'];
        this.jobTypeBackGround = ['blue', 'red', 'yellow', 'grey'];
        this.jobTypeChartId = 'job'
        this.jobTypeChartType = 'line'

        this.isLoaded = true
      })
    })
  }

  ngOnInit(): void {
  }

  findAnalytics(job: Job) {
    if (job.status === 'pending') this.pending++;
    if (job.status === 'declined') this.declined++;
    if (job.status === 'interview') this.interview++;
    if (job.jobtype === 'full-time') this.fullTime++;
    if (job.jobtype === 'part-time') this.partTime++;
    if (job.jobtype === 'remote') this.remote++;
    if (job.jobtype === 'internship') this.internship++;
  }

  changeChartType(type : string){
      this.statusChartType= type;
  }

}
