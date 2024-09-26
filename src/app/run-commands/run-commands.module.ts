import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunCommandsComponent } from './components/run-commands/run-commands.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/components/login/login.component';

@NgModule({
  declarations: [RunCommandsComponent],
  imports: [CommonModule, FormsModule],
})
export class RunCommandsModule {}
