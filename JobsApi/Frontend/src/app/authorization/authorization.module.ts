import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from "src/app/shared/shared.module"; 
import { MaterialModule } from "src/app/material/material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from "src/app/app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    MaterialModule, 
    FlexLayoutModule,
    AppRoutingModule, 
    ReactiveFormsModule, HttpClientModule
  ], 
  exports: [
    LoginComponent,
    SignupComponent
  ],
})
export class AuthorizationModule { }
