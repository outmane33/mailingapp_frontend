import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isavailable = false;
  private authTokenKey = 'authToken';
  private userKey = 'user'; // To store user information
  public user_name = '';
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
    // Check if we are in the browser environment
    if (this.isBrowser()) {
      this.isavailable = !!localStorage.getItem(this.authTokenKey);
    }
  }

  // Check if we're in the browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Register API call
  register(data: any) {
    return this.http
      .post(`${this.apiUrl}/connect/register`, data)
      .pipe((response: any) => {
        if (response.token && this.isBrowser()) {
          // Store token and user information
          this.storeUserData(response.token, response.user);
        }
        return response;
      });
  }

  // Login API call
  login(data: any) {
    return this.http
      .post(`${this.apiUrl}/connect/login`, data)
      .pipe((response: any) => {
        if (response.token && this.isBrowser()) {
          // Store token and user information
          this.storeUserData(response.token, response.user);
        }
        return response;
      });
  }

  // Logout function
  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.authTokenKey);
      localStorage.removeItem(this.userKey);
    }
    this.isavailable = false;
  }

  // Helper function to store token and user information in localStorage
  private storeUserData(token: string, user: any) {
    if (this.isBrowser()) {
      localStorage.setItem(this.authTokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
    this.isavailable = true;
  }

  // Helper function to get the authentication token
  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.authTokenKey);
    }
    return null;
  }

  // Helper function to get the current user info
  getUser(): any {
    if (this.isBrowser()) {
      const user = localStorage.getItem(this.userKey);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  // Helper function to check if the user is logged in
  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem(this.authTokenKey);
    }
    return false;
  }
}
