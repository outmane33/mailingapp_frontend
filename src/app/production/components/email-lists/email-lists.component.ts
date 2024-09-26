import { Component } from '@angular/core';

import { ProductionService } from '../../services/production.service';

@Component({
  selector: 'app-email-lists',
  templateUrl: './email-lists.component.html',
  styleUrl: './email-lists.component.css',
})
export class EmailListsComponent {
  public dataName: any[] = [];
  public emaillistFilter: any = {
    country: 'United States',
  };
  public coutry: any = '';
  public start: any = '';
  public count: any = '';
  public duplicate: any = '';
  public coutryId: any = 'selectcountry';
  public startId = 'startid';
  public countId = 'countId';
  public duplicateDataId = 'duplicateDataId';
  public dataListName: any = '';

  constructor(public service: ProductionService) {
    this.getData();
  }

  getSelectCountry() {
    let coutryInput: any = document.getElementById(this.coutryId);
    this.coutry = coutryInput.value;
    this.emaillistFilter.country = this.coutry;
    this.service.emaillistFilter = this.emaillistFilter;
    this.getData();
  }

  run(checkboxId: string, labelId: string) {
    // Get the checkbox and label elements dynamically based on the passed IDs
    const checkbox: HTMLInputElement = document.getElementById(
      checkboxId
    ) as HTMLInputElement;
    const label: HTMLElement = document.getElementById(labelId) as HTMLElement;

    // Ensure both the checkbox and label exist in the DOM
    if (checkbox && label) {
      const labelText = label.textContent?.trim(); // Get the label text and trim whitespace

      if (checkbox.checked) {
        // If the checkbox is checked, add the label text to the dataName array if not already included
        if (labelText && !this.dataName.includes(labelText)) {
          this.dataName.push(labelText);
        }
      } else {
        // If the checkbox is unchecked, remove the label text from the dataName array
        const index = this.dataName.indexOf(labelText);
        if (index !== -1) {
          this.dataName.splice(index, 1); // Remove the item at the found index
        }
      }
    }

    // Update the emaillistFilter object and emit the change using child event
    this.emaillistFilter.dataName = this.dataName;
    this.service.emaillistFilter = this.emaillistFilter;
    this.getData();
  }

  getStart() {
    let startInput: any = document.getElementById(this.startId);
    this.start = startInput.value;
    this.service.startFrom = this.start;
  }

  getCount() {
    let countInput: any = document.getElementById(this.countId);
    this.count = countInput.value;
    this.service.count = this.count;
  }
  getDuplicateData() {
    let duplicateDataInput: any = document.getElementById(this.duplicateDataId);
    this.duplicate = duplicateDataInput.value;
    this.service.duplicate = this.duplicate;
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

  // -----------------------------------------------------------------------
  getDataName(checkboxId: string, labelId: string) {
    // Get the checkbox and label elements dynamically based on the passed IDs
    const checkbox: HTMLInputElement = document.getElementById(
      checkboxId
    ) as HTMLInputElement;
    const label: HTMLElement = document.getElementById(labelId) as HTMLElement;

    if (checkbox && label) {
      if (checkbox.checked) {
        // If checked, add the label text to the dataListName array if not already included
        if (!this.dataListName.includes(label.textContent || '')) {
          this.dataListName = label.textContent || '';
          this.service.dataListName = this.dataListName;
        }
      } else {
        // If unchecked, remove the label text from the dataListName array
        const index = this.dataListName.indexOf(label.textContent || '');
        if (index !== -1) {
          this.dataListName = '';
          this.service.dataListName = this.dataListName;
        }
      }
    }
  }
}
