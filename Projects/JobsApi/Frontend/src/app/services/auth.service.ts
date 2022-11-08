import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, of, throwError } from 'rxjs';
import { LogIn, Register } from '../interfaces';
import { StorageServiceService } from './storage-service.service';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = `${environment.BASE_URL}/auth`
  constructor(private httpClient :HttpClient, private storageService : StorageServiceService) { }

  logInUser(email  :string , password : string ): Observable<LogIn> {
      return this.httpClient.post<LogIn>(`${this.BASE_URL}/login`, {
        email : email,
        password : password
      });
  }

  registeruser(details : any ) : Observable<Register>{
    return this.httpClient.post<Register>(`${this.BASE_URL}/register`,details);
  }

  loggedIn()  :boolean{
    if(this.storageService.getDecodedToken()){
      return true;
    }else {
      return false;
    }
  }
}
