import { HttpClient, HttpParams } from '@angular/common/http';
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
  // Get all data info
  getAllData(paramsObj?: {
    limit?: number;
    page?: number;
    Total_Count?: number;
    data_provider?: string;
    Name?: string;
    Updated_At?: string;
  }) {
    // Initialize HttpParams object
    let params = new HttpParams();

    // If paramsObj is provided, set the params conditionally
    if (paramsObj) {
      if (paramsObj.limit !== undefined) {
        params = params.set('limit', paramsObj.limit.toString());
      }
      if (paramsObj.page !== undefined) {
        params = params.set('page', paramsObj.page.toString());
      }
      if (paramsObj.Name !== undefined) {
        params = params.set('Name', paramsObj.Name.toString());
      }
      if (paramsObj.Total_Count !== undefined) {
        params = params.set('Total_Count', paramsObj.Total_Count.toString());
      }
      if (paramsObj.Updated_At !== undefined) {
        params = params.set('Updated_At', paramsObj.Updated_At.toString());
      }
      if (paramsObj.data_provider !== undefined) {
        params = params.set(
          'data_provider',
          paramsObj.data_provider.toString()
        );
      }
    }

    return this.http.get(`${this.apiUrl}/data`, { params });
  }
}
