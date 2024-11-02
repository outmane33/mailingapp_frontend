import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private sharedService: SharedService
  ) {}

  // Object to hold login data
  loginData = {
    email: '',
    password: '',
  };

  // Function to handle login
  onLogin() {
    if (this.loginData.email && this.loginData.password) {
      const loginPayload = {
        email: this.loginData.email,
        password: this.loginData.password,
      };

      this.login(loginPayload);
    } else {
      this.sharedService.alert('error', 'Form is invalid');
    }
  }

  login(data: any) {
    this.loginService.login(data).subscribe(
      (res: any) => {
        // Assuming res.token contains the JWT token
        if (res.token) {
          this.loginService.isavailable = true;
          this.loginService.user_name = res.user_name;
          // Store the token securely in localStorage
          localStorage.setItem('authToken', res.token);

          // Optionally store additional user info
          localStorage.setItem('user', JSON.stringify(res.user_name));

          //set user_name
          localStorage.setItem('user_name', JSON.stringify(res.user_name));
          this.sharedService.alert('success', 'Login successful');
        } else {
          this.sharedService.alert('error', 'Login failed');
        }
      },
      (err: any) => {
        this.sharedService.alert('error', err.error.message);
      }
    );
  }
  register() {}
}
