import { Component } from '@angular/core';
import { ProductionService } from '../../services/production.service';

@Component({
  selector: 'app-offer-info',
  templateUrl: './offer-info.component.html',
  styleUrl: './offer-info.component.css',
})
export class OfferInfoComponent {
  selectedAffiliateNetwork: string = '';
  selectedOffer: string = '';

  constructor(private productionService: ProductionService) {}

  // Function to capture the selected Affiliate Network
  onSelectChangeAffiliateNetwork(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedAffiliateNetwork = target.value;
    this.productionService.affiliateNetwork = this.selectedAffiliateNetwork;
  }
  // Function to capture the selected Offer
  onSelectChangeOffer(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedOffer = target.value;
    this.productionService.offer = this.selectedOffer;
  }
}
