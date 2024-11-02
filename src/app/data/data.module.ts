import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageDataComponent } from './components/manage-data/manage-data.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManageDataComponent],
  imports: [CommonModule, FormsModule],
})
export class DataModule {}
