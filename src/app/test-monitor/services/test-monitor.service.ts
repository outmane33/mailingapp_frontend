import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestMonitorService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiBaseUrl;

  getAllTests(paramsObj?: {
    limit?: number;
    page?: number;
    opens?: number;
    clicks?: number;
    campaignName?: string;
    mailer?: string;
    offer?: string;
    affiliate_network?: string;
    isp?: string;
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
      if (paramsObj.campaignName !== undefined) {
        params = params.set('campaignName', paramsObj.campaignName.toString());
      }
      if (paramsObj.mailer !== undefined) {
        params = params.set('mailer', paramsObj.mailer.toString());
      }
      if (paramsObj.offer !== undefined) {
        params = params.set('offer', paramsObj.offer.toString());
      }
      if (paramsObj.opens !== undefined) {
        params = params.set('opens', paramsObj.opens.toString());
      }
      if (paramsObj.clicks !== undefined) {
        params = params.set('clicks', paramsObj.clicks.toString());
      }
      if (paramsObj.affiliate_network !== undefined) {
        params = params.set(
          'affiliate_network',
          paramsObj.affiliate_network.toString()
        );
      }
      if (paramsObj.isp !== undefined) {
        params = params.set('isp', paramsObj.isp.toString());
      }
    }

    // Send GET request with the params if they exist
    return this.http.get(`${this.apiUrl}/test`, { params });
  }
}
