import { Component } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent {
  public allusers: any[] = [];

  constructor(private sharedService: SharedService) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.sharedService.getAllUsers().subscribe(
      (res: any) => {
        this.allusers = res.users;
        this.sharedService.totalusers = this.allusers.length;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
