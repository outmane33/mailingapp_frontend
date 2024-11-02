import { Component } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-dashboard-statistics',
  templateUrl: './dashboard-statistics.component.html',
  styleUrl: './dashboard-statistics.component.css',
})
export class DashboardStatisticsComponent {
  public sendersCount = 0;
  public dailyDrops = 0;
  public dailyTests = 0;
  public dailyDelivred = 0;
  public dailyClick = 0;
  public monthlyClick = 0;

  constructor(public sharedService: SharedService) {
    this.getAllSendersCount();
    this.getCountDropsToday();
    this.getCountTestToday();
    this.getDailyDelivred();
    this.getDailyClicks();
    this.getMonthlyClicks();
  }

  getAllSendersCount() {
    this.sharedService.getAllSendersCount().subscribe(
      (res: any) => {
        this.sendersCount = res.counts.total;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCountDropsToday() {
    this.sharedService.getCountDropsToday().subscribe(
      (res: any) => {
        this.dailyDrops = res.count;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCountTestToday() {
    this.sharedService.getCountTestToday().subscribe(
      (res: any) => {
        this.dailyTests = res.count;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getDailyDelivred() {
    this.sharedService.getDailyDelivred().subscribe(
      (res: any) => {
        this.dailyDelivred = res.totalLastStartIndex;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getDailyClicks() {
    this.sharedService.getDailyClicks().subscribe(
      (res: any) => {
        this.dailyClick = res.totalClicks;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getMonthlyClicks() {
    this.sharedService.getMonthlyClicks().subscribe(
      (res: any) => {
        this.monthlyClick = res.totalClicks;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
