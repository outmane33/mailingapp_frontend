import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  //Send Senders Data To BackEnd
  sendSendersData(data: any, isp: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/boites/${isp}`, data); // Sends a POST request
  }
  //get data names
  getDataNames() {
    return this.http.get(`${this.apiUrl}/boites`);
  }
}
