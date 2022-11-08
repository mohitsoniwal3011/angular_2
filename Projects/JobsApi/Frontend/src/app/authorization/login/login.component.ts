import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  logInDetails: FormGroup;
  EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
  constructor(private formBuilder: FormBuilder,
    private authservice: AuthService,
    private _snakeBar: MatSnackBar,
    private router: Router,
    private storageService: StorageServiceService,
    private notificationService : NotificationService
  ) {
    this.logInDetails = formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  getFormData() {
    if (this.logInDetails.valid) {
      this.logInUser();
    }
  }

  logInUser() {
    const details = this.logInDetails.value;
    this.authservice.logInUser(details.email, details.password).subscribe(res => {
      //errors are autometically checked in error interceptor 
      this.notificationService.open(`Welcome back ${res.user.name}`,'success');
      this.storageService.setToken(res.token);
      this.router.navigate(['dashboard']);
    })
  }
  showDemoApp(){
    this.authservice.logInUser(environment.demoUserEmail, environment.demoUserPassword).subscribe(res => {
      this.notificationService.open(`Welcome back  ${res.user.name}`,'success');
      this.storageService.setToken(res.token);
      this.router.navigate(['dashboard']);
    })
  }

}
