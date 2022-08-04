import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileInfo } from 'src/app/interfaces';
import { NotificationService } from 'src/app/services/notification.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editDetailsForm: FormGroup;
  profileInfo: ProfileInfo;
  isLoaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private utilityService: UtilityService,
    private notificationService: NotificationService
  ) { }
  ngOnInit(): void {
    this.utilityService.getProfile().subscribe(res => {
      this.profileInfo = res;
      this.editDetailsForm = this.fb.group({
        name: [`${this.profileInfo.name}`, [Validators.minLength(3), Validators.maxLength(50)]],
        lastname: [`${this.profileInfo.lastname}`],
        email: [`${this.profileInfo.email}`, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)],
        location: [`${this.profileInfo.location}`]
      })
      this.isLoaded = true;
    })
  }

  onSubmit() {
    const details = this.editDetailsForm.value;
    if (this.editDetailsForm.valid) {
      this.utilityService.updateProfile(this.editDetailsForm.value).subscribe(res => {
        this.profileInfo = res;
        this.editDetailsForm.reset({
          name: [`${this.profileInfo.name}`,],
          lastname: [`${this.profileInfo.lastname}`],
          email: [`${this.profileInfo.email}`],
          location: [`${this.profileInfo.location}`]
        })
        this.notificationService.open('Successfully updated profile!', 'success');
      })
    } else {
      if (
        this.editDetailsForm.get('name').hasError('minLength') ||
        this.editDetailsForm.get('name').hasError('maxLength')
      ) {
        this.notificationService.open('Name should be between 3 and 50 characters', 'error');
      }
      if (this.editDetailsForm.get('email').hasError('required')) {
        this.notificationService.open('Email is required', 'error');
      }
      if (this.editDetailsForm.get('email').hasError('pattern')) {
        this.notificationService.open('Please provide a valid email address', 'error');
      }
    };
  }

}
