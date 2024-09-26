import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropMonitorComponent } from './components/drop-monitor/drop-monitor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DropMonitorComponent],
  imports: [CommonModule, FormsModule],
})
export class DropMonitorModule {}
