import { Component } from '@angular/core';
import { ProductionService } from '../../services/production.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-all-boites',
  templateUrl: './all-boites.component.html',
  styleUrl: './all-boites.component.css',
})
export class AllBoitesComponent {
  public allBoites: any[] = [];
  constructor(
    private service: ProductionService,
    public sharedService: SharedService
  ) {}

  selectedCount: number = 0; // To keep track of the number of selected items

  // Function to count selected items
  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.selectedOptions); // Get all selected options

    this.selectedCount = selectedOptions.length; // Set the count to the number of selected options
  }
}
