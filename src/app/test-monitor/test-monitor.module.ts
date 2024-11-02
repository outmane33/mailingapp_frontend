import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestMonitorComponent } from './components/test-monitor/test-monitor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestMonitorComponent],
  imports: [CommonModule, FormsModule],
})
export class TestMonitorModule {}
