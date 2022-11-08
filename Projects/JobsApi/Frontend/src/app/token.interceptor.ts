import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageServiceService } from './services/storage-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storageService : StorageServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storageService.getToken();
    const req = request.clone({
      setHeaders : {
        Authorization : `Bearer ${token}`
      }
    });
    // console.log("inside interceptor :", req.headers);
    return next.handle(req);
  }
}
