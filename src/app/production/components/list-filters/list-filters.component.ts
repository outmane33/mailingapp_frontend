import { Component } from '@angular/core';
import { ProductionService } from '../../services/production.service';

@Component({
  selector: 'app-list-filters',
  templateUrl: './list-filters.component.html',
  styleUrl: './list-filters.component.css',
})
export class ListFiltersComponent {
  public ispId: any = 'selectISP';
  public email_type: any[] = [];
  public listFilter: any = {};

  constructor(private service: ProductionService) {}
  getIspEmailType() {
    let ispInput: any = document.getElementById(this.ispId);
    let isp = ispInput.value;
    this.listFilter.isp = isp;
    this.service.listFilter = this.listFilter;
    this.getData();
  }
  run(checkboxId: string, labelId: string) {
    this.getIspEmailType();
    // Get the checkbox and label elements dynamically based on the passed IDs
    const checkbox: HTMLInputElement = document.getElementById(
      checkboxId
    ) as HTMLInputElement;
    const label: HTMLElement = document.getElementById(labelId) as HTMLElement;

    if (checkbox && label) {
      if (checkbox.checked) {
        // If checkbox is checked, add the label text to the email_type array if not already included
        if (!this.email_type.includes(label.textContent)) {
          this.email_type.push(label.textContent);
        }
      } else {
        // If checkbox is unchecked, remove the label text from the email_type array
        const index = this.email_type.indexOf(label.textContent);
        if (index !== -1) {
          this.email_type.splice(index, 1);
        }
      }
    }
    this.listFilter.email_type = this.email_type;
    this.service.listFilter = this.listFilter;
    this.getData();
  }

  getData() {
    let data = {
      ...this.service.listFilter,
      country: this.service.emaillistFilter.country,
    };
    this.service.getData(data).subscribe(
      (response) => {
        this.service.data = response;
      },
      (error) => {
        console.error('Error occurred while sending data:', error);
      }
    );
  }
}
