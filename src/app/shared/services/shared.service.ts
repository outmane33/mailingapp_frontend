import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

environment;
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  public allSendersBoites: any[] = [];
  public selectSenderIsp = 'gmail';

  generateRandomString(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Uppercase, lowercase, and numbers
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length); // Get random index
      result += chars[randomIndex]; // Append character to result
    }
    return result;
  }

  alert(icon: any, message: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: icon,
      title: message,
    });
  }

  getAllDrops(paramsObj?: {
    limit?: number;
    page?: number;
    campaignName?: string;
    status?: string;
    isp?: string;
    dataListName?: string;
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
      if (paramsObj.status !== undefined) {
        params = params.set('status', paramsObj.status.toString());
      }
      if (paramsObj.isp !== undefined) {
        params = params.set('isp', paramsObj.isp.toString());
      }
      if (paramsObj.dataListName !== undefined) {
        params = params.set('dataListName', paramsObj.dataListName.toString());
      }
    }

    // Send GET request with the params if they exist
    return this.http.get(`${this.apiUrl}/drop`, { params });
  }
  getAllSendersBoites(isp: any) {
    return this.http.get(`${this.apiUrl}/boites/` + isp);
  }
}
