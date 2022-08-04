import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageServiceService } from './services/storage-service.service';
import { NotificationService } from './services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageServiceService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error : HttpErrorResponse)=>{
      if (error.status === 0) {
        console.error('An error occurred:', error.error);
      } else {
        console.error(`Backend returned code ${error.status}, body was: `, error.error);
      }
      let msg = 'Something Went wrong try again later';
      if (error.status == 400 || error.status == 401  || error.status == 404){
        msg = error.error.msg;
      }
      if(this.router.url != '/login' && this.router.url != '/register' &&(error.status == 401)){
        //log out the user if the user is unauthorized
        this.storageService.clearToken();
        this.router.navigate(['home']);
      }
      this.notificationService.open(msg, 'error')
      return throwError(() => error.error);
    }));
  }

}
