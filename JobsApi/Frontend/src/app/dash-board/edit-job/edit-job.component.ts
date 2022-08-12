import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Job } from 'src/app/interfaces';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }

  editJobForm: FormGroup
  statusType: string[];
  jobTypes: string[];
  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private utilityService: UtilityService,
    private notificationService: NotificationService,
    private storageService : StorageServiceService,
    private matRef : MatDialogRef<EditJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Job
  ) {
    this.editJobForm = fb.group({
      company: [`${this.data.company}`, Validators.required],
      position: [`${this.data.position}`, Validators.required],
      joblocation: `${this.data.joblocation}`,
      status: `${this.data.status}`,
      jobtype: `${this.data.jobtype}`
    })
  }


  ngOnInit(): void {
    this.utilityService.getJobtypes().subscribe(res => {
      this.jobTypes = res;
    })
    this.utilityService.getStatusTypes().subscribe(res => {
      this.statusType = res;
    })
  }

  onFormSubmit() {
    if (this.editJobForm.valid) {
      if(this.storageService.getUserEmail()  === environment.demoUserEmail){
        this.notificationService.open('Demo user ,read Only...', 'error');
        return ;
      }
        this.userservice.updateJob(this.data._id,this.editJobForm.value).subscribe(res => {
          this.notificationService.open('Edited Job successfully', 'success');
          this.matRef.close(res);
        })
    }
  }

  resetForm() {
    this.editJobForm.reset({
      company: `${this.data.company}`,
      position: `${this.data.position}`,
      joblocation: `${this.data.joblocation}`,
      status: `${this.data.status}`,
      jobtype: `${this.data.jobtype}`
    });
  }

}
