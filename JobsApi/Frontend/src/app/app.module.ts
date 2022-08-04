import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from "src/app/material/material.module";
import { AuthorizationModule } from "src/app/authorization/authorization.module";
import { AuthGuardGuard } from './auth-guard.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { StorageServiceService } from './services/storage-service.service';
import { NotificationService } from './services/notification.service';
import { Router } from '@angular/router';
import { DashBoardModule } from "src/app/dash-board/dash-board.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule, 
    MaterialModule,
    AuthorizationModule, 
    DashBoardModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuardGuard, 
    {
      provide : HTTP_INTERCEPTORS, 
      useClass : TokenInterceptor, 
      deps : [StorageServiceService],
      multi : true, 
    }, 
    {
      provide : HTTP_INTERCEPTORS, 
      useClass : ErrorInterceptor, 
      deps : [StorageServiceService,NotificationService, Router],
      multi: true,
    }
],
  bootstrap: [AppComponent], 
})
export class AppModule { }
