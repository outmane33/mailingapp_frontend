import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenuReportComponent } from './components/revenu-report/revenu-report.component';
import { TotalRevenuReportComponent } from './components/total-revenu-report/total-revenu-report.component';
import { TopOffersComponent } from './components/top-offers/top-offers.component';



@NgModule({
  declarations: [
    RevenuReportComponent,
    TotalRevenuReportComponent,
    TopOffersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RevenuReportModule { }
