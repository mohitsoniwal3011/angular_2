import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Job, JobEventInfo } from "src/app/interfaces";
import { NotificationService } from 'src/app/services/notification.service';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditJobComponent } from '../edit-job/edit-job.component';
@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})
export class AllJobsComponent implements OnInit {
  searchFilterDetails: FormGroup
  jobTypes: string[] = [];
  statusType: string[] = [];
  allJobs : Job[] =[];
  constructor(private utilityService: UtilityService,
    private fb: FormBuilder,
    private userService : UserService,
    private notificationService : NotificationService,
    private dialog : MatDialog
  ) {
    this.searchFilterDetails = fb.group({
      company: '',
      status: '',
      jobtype: '',
      sort: ''
    }
    )
  }

  ngOnInit(): void {
    this.utilityService.getJobtypes().subscribe(res => {
      this.jobTypes = res;
    })
    this.utilityService.getStatusTypes().subscribe(res => {
      this.statusType = res;
    })
    this.getJobs()
  }


  getJobs(){    
    this.userService.getAllJobs().subscribe(res => {
      this.allJobs = res.jobs
    })
  }
  filterJobs() {
    const formValue = this.searchFilterDetails.value;
    this.userService.getAllJobs().subscribe(res => {
      this.allJobs =res.jobs.filter(job => {
          let result = true;
          if(formValue.company){
              result = result &&  job.company.toLowerCase() === formValue.company.toLowerCase() 
          }
          if(formValue.status){
            result = result &&  job.status.toLowerCase() === formValue.status.toLowerCase() 
          }
          if(formValue.jobtype){
            result = result &&  job.jobtype.toLowerCase() === formValue.jobtype.toLowerCase() 
          }
          return result;
      })
      if(formValue.sort){
        this.sortJobs(formValue.sort);
      }
    })
  }
  
  sortJobs(type : string){
    this.allJobs.sort((a, b)=>{
      if(type === 'A-Z'){
        return (a.company).localeCompare(b.company);
      }
      else if(type === 'Z-A'){
        return (b.company).localeCompare(a.company);
      }
      else if(type === 'oldest'){
        return (new Date(a.createdAt) > new Date(b.createdAt) )? 1 : -1;
      }
      else {
        return (new Date(b.createdAt) > new Date(a.createdAt)) ? 1 : -1;      
      }
    })
  }
  resetFilters() {
    this.searchFilterDetails.reset();
    this.getJobs();
  }

  handleDelete(event : Job){
    this.userService.deleteJob(event._id).subscribe(res => {
        //any error will autometically caught in error interceptor 
        this.notificationService.open('Success', 'success')
        this.getJobs();
    });
  }

  handleEditEvent(event : JobEventInfo){
    console.log("edit working ",event.job.company);
    let dialogRef = this.dialog.open(EditJobComponent, 
      { width:'900px',
        data:event.job,
        panelClass :'mat-elevation-z8'
      })
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.allJobs[event.index] = res;
      }
    })
  }
}
