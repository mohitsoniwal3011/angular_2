import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment.prod';

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
    private notificationService : NotificationService, 
    private storageService : StorageServiceService
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
      if(this.storageService.getUserEmail()  === environment.demoUserEmail){
        this.notificationService.open('This is a demo user, read only...', 'error');
        return;
      }
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
