import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ProfileInfo } from '../interfaces';
import { StorageServiceService } from './storage-service.service';

const BASE_URL = `${environment.BASE_URL}/util`
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(  
    private httpClient : HttpClient,
    private storageService : StorageServiceService
  ) { }

  getStatusTypes(): Observable<string[]>{
      return this.httpClient.get<string[]>(`${BASE_URL}/job-status`)
  }

  getJobtypes() : Observable<string[]>{
    return this.httpClient.get<string[]>(`${BASE_URL}/job-type`);
  }

  getProfile() : Observable<ProfileInfo> {  
    return this.httpClient.get<ProfileInfo>(`${BASE_URL}/${this.storageService.getUserId()}`);
  }

  updateProfile(details : any) : Observable<ProfileInfo>{
      return this.httpClient.patch<ProfileInfo>(`${BASE_URL}/update/${this.storageService.getUserId()}`,details );
  }
}
