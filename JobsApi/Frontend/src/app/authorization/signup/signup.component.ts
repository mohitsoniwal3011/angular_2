import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpDetails : FormGroup;
  EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
  constructor( 
    private formBuilder : FormBuilder,
    private authService : AuthService, 
    private notificationService : NotificationService
  ) {
    this.signUpDetails = formBuilder.group({
      name: ['', Validators.required], 
      email: ['', [Validators.required,Validators.pattern(this.EMAIL_REGEX)]], 
      password : ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  getFormDetails(){
    if(this.signUpDetails.valid){
      const details = this.signUpDetails.value;
      this.authService.registeruser(details).subscribe(res => {
        if(res.name){
          this.notificationService.open('User registeres successfully, login to continue', 'success');
        }
      })
    }
  }

}
