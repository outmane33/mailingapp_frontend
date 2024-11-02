import { Component } from '@angular/core';
import { LoginService } from '../../../login/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(public loginservice: LoginService) {}

  logOut() {
    this.loginservice.logout();
  }
}
