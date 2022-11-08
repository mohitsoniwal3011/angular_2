import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Job , Jobs } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = `${environment.BASE_URL}/jobs`
  constructor(private httpClient : HttpClient) {}

  getAllJobs() : Observable<Jobs> {
    return this.httpClient.get<Jobs>(`${this.BASE_URL}/`);
  }

  getSingleJob(id : string): Observable<Job> {
    let httpParams = new HttpParams();
    return this.httpClient.get<Job>(`${this.BASE_URL}/${id}`);
  }

  updateJob(id : string , body :any)  :Observable<Job>{
    return this.httpClient.patch<Job>(`${this.BASE_URL}/${id}`, body);
  }

  createJob(details : any): Observable<Job>{
    return this.httpClient.post<Job>(`${this.BASE_URL}/`, details);
  }

  deleteJob(id: string) : Observable<Job> {
    return this.httpClient.delete<Job>(`${this.BASE_URL}/${id}`);
  }

}
