import { Component, Output, EventEmitter } from '@angular/core';
import { ProductionService } from '../../services/production.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-before-test',
  templateUrl: './before-test.component.html',
  styleUrl: './before-test.component.css',
})
export class BeforeTestComponent {
  @Output() public child = new EventEmitter();

  public allBoites: any[] = [];
  constructor(
    private service: ProductionService,
    public sharedService: SharedService
  ) {
    this.getAllSendersBoites('gmail');
  }

  getAllSendersBoites(isp: any) {
    this.service.getAllSendersBoites(isp).subscribe(
      (res: any) => {
        this.allBoites = res.emails;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  selectedOptions: { app_password: string; email: string }[] = [];
  public selectedCount = 0;

  // Function to get selected values, text, and count of selected options
  selectValue(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.selectedOptions);

    // Map selected values to the desired format
    this.selectedOptions = selectedOptions.map((option: HTMLOptionElement) => ({
      app_password: option.value, // app_password
      email: option.text, // email
    }));

    // Get the count of selected options
    const selectedCount = selectedOptions.length;

    // Emit the selected options
    this.child.emit(this.selectedOptions);

    // You can do something with the count if needed, like logging it
    this.selectedCount = selectedCount;
  }
}
