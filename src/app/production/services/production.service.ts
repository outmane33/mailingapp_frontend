import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductionService {
  public listFilter: any = { isp: 'RR' };
  public emaillistFilter: any = {
    country: 'United States',
  };
  public startFrom = 0;
  public count = 0;
  public duplicate = 1;
  public data: any = [];
  public dataListName = '';
  public affiliateNetwork = '';
  public offer = '';

  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiBaseUrl;
  //GET all senders boites service
  getAllSendersBoites(isp: any) {
    return this.http.get(`${this.apiUrl}/boites/` + isp);
  }
  //SEND test service
  sendTest(data: any) {
    return this.http.post(`${this.apiUrl}/send/test`, data);
  }
  //SEND drop service
  sendDrop(data: any) {
    return this.http.post(`${this.apiUrl}/send/drop`, data);
  }
  //GET Data
  getData(data: any) {
    return this.http.post(`${this.apiUrl}/data`, data);
  }
}
