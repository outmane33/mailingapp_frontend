import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { RevenuReportComponent } from './revenu-report/components/revenu-report/revenu-report.component';
import { ProductionComponent } from './production/components/production/production.component';
import { DropMonitorComponent } from './drop-monitor/components/drop-monitor/drop-monitor.component';
import { TestMonitorComponent } from './test-monitor/components/test-monitor/test-monitor.component';
import { SuppressionComponent } from './suppression/components/suppression/suppression.component';
import { UsersComponent } from './users/components/users/users.component';
import { SettingsComponent } from './settings/components/settings/settings.component';
import { RunCommandsComponent } from './run-commands/components/run-commands/run-commands.component';
import { ManageDataComponent } from './data/components/manage-data/manage-data.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'revenuReport', component: RevenuReportComponent },
  { path: 'production', component: ProductionComponent },
  { path: 'runCommands', component: RunCommandsComponent },
  { path: 'dropMonitor', component: DropMonitorComponent },
  { path: 'testMonitor', component: TestMonitorComponent },
  { path: 'suppression', component: SuppressionComponent },
  { path: 'manageUsers', component: UsersComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'manageData', component: ManageDataComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
