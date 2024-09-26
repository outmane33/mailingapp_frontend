import { Component } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-last-drops',
  templateUrl: './last-drops.component.html',
  styleUrl: './last-drops.component.css',
})
export class LastDropsComponent {
  constructor(private sharedService: SharedService) {
    this.getAllDrops();
  }

  public drops: any[] = [];

  getAllDrops() {
    this.sharedService.getAllDrops().subscribe(
      (res: any) => {
        this.drops = res.data;
        console.log(this.drops);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
