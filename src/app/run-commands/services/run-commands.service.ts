import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RunCommandsService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiBaseUrl;

  //PAUSE CAMPAIGN
  pauseCampaign(data: any) {
    return this.http.post(`${this.apiUrl}/send/pauseCampaign`, data);
  }
  //PAUSE CAMPAIGN
  resumeCampaign(data: any) {
    return this.http.post(`${this.apiUrl}/send/resumeCampaign`, data);
  }
  //PAUSE CAMPAIGN
  stopCampaign(data: any) {
    return this.http.post(`${this.apiUrl}/send/stopCampaign`, data);
  }
  getDropByName(campaignName: any) {
    return this.http.get(`${this.apiUrl}/drop/${campaignName}`);
  }
}
