import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProductionModule } from './production/production.module';
import { RevenuReportComponent } from './revenu-report/components/revenu-report/revenu-report.component';
import { RevenuReportModule } from './revenu-report/revenu-report.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';
import { HttpClientModule } from '@angular/common/http';
import { DataModule } from './data/data.module';
import { CommonModule } from '@angular/common';
import { RunCommandsModule } from './run-commands/run-commands.module';
import { FormsModule } from '@angular/forms';
import { DropMonitorComponent } from './drop-monitor/components/drop-monitor/drop-monitor.component';
import { DropMonitorModule } from './drop-monitor/drop-monitor.module';
import { LoginModule } from './login/login.module';
import { TestMonitorModule } from './test-monitor/test-monitor.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RevenuReportModule,
    DashboardModule,
    SettingsModule,
    HttpClientModule,
    DataModule,
    CommonModule,
    RunCommandsModule,
    FormsModule,
    DropMonitorModule,
    LoginModule,
    TestMonitorModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
