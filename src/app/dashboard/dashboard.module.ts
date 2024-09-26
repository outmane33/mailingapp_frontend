import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardStatisticsComponent } from './components/dashboard-statistics/dashboard-statistics.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { LastDropsComponent } from './components/last-drops/last-drops.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardStatisticsComponent,
    AllUsersComponent,
    LastDropsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
