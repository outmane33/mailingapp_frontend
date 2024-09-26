import { Component } from '@angular/core';
import { LoginService } from './login/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
  constructor(public loginService: LoginService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('authToken');

    if (token) {
      // Check if the token is valid (optionally send it to the server to verify)
      this.loginService.isavailable = true;
    } else {
      this.router.navigate(['/login']); // Redirect to login if no token found
    }
  }
}
