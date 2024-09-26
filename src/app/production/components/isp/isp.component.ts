import { Component, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-isp',
  templateUrl: './isp.component.html',
  styleUrl: './isp.component.css',
})
export class IspComponent {
  sendersIsp: string[] = ['gmail', 'outlook', 'yahoo'];

  constructor(private sharedService: SharedService) {}

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValues = Array.from(selectElement.selectedOptions)
      .map((option: HTMLOptionElement) => option.value)
      .join('');
    this.getAllSendersBoites(selectedValues);
    this.sharedService.selectSenderIsp = selectedValues;
  }

  getAllSendersBoites(isp: any) {
    this.sharedService.getAllSendersBoites(isp).subscribe(
      (res: any) => {
        this.sharedService.allSendersBoites = res.emails;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
