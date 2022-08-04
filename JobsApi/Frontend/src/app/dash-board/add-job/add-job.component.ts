import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
  addJobForm : FormGroup
  statusType : string[];
  jobTypes : string[];
  constructor(
    private fb : FormBuilder,
    private userservice : UserService,
    private utilityService : UtilityService,
    private notificationService : NotificationService
  ) { 
    this.addJobForm = fb.group({
        company : ['', Validators.required] , 
        position  : ['', Validators.required],
        joblocation : 'london',
        status : 'pending', 
        jobtype : 'full-time'
    })
  }

  ngOnInit(): void {
    this.utilityService.getJobtypes().subscribe(res => {
      this.jobTypes= res ;
    })
    this.utilityService.getStatusTypes().subscribe(res => {
      this.statusType = res;
    })
  }

  onFormSubmit(){
    if(this.addJobForm.valid){
      this.userservice.createJob(this.addJobForm.value).subscribe(res => {
          this.notificationService.open('Success', 'success')
      })
    }
  }

  resetForm(){
    this.addJobForm.reset({
        joblocation : 'london',
        status : 'pending', 
        jobtype : 'full-time'
    });
  }
}
