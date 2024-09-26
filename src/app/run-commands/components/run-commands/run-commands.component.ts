import { Component } from '@angular/core';
import { RunCommandsService } from '../../services/run-commands.service';
import { SharedService } from '../../../shared/services/shared.service';
import { ProductionService } from '../../../production/services/production.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-run-commands',
  templateUrl: './run-commands.component.html',
  styleUrl: './run-commands.component.css',
})
export class RunCommandsComponent {
  constructor(
    private service: RunCommandsService,
    private sharedService: SharedService,
    private productionService: ProductionService
  ) {}
  public campaignName: any = '';
  public dropData: any = {};
  public campaignStatus: any = 'active';
  public totalDataOut: any = 0;
  public totalDataIn: any = 0;
  public isp: any = 'RR';

  pauseCampaign() {
    this.service.pauseCampaign({ campaignName: this.campaignName }).subscribe(
      (res: any) => {
        this.campaignStatus = 'paused';
        this.sharedService.alert('success', res.message);
      },
      (err) => {
        this.sharedService.alert('error', err.error.message);
      }
    );
  }
  resumeCampaign() {
    this.service.resumeCampaign({ campaignName: this.campaignName }).subscribe(
      (res) => {
        this.resumeDrop();
      },
      (err) => {
        this.sharedService.alert('error', err.error.message);
      }
    );
  }
  stopCampaign() {
    this.service.stopCampaign({ campaignName: this.campaignName }).subscribe(
      (res) => {
        this.campaignStatus = 'stopped';
        this.sharedService.alert(
          'success',
          `campaign is: ${this.campaignStatus}`
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  searchDrop() {
    this.service.getDropByName(this.campaignName).subscribe(
      (res: any) => {
        this.dropData = res.drop[0];
        this.campaignStatus = this.dropData.status;
        this.totalDataOut = this.dropData.lastStartIndex;
        this.totalDataIn = this.dropData.total;
        this.isp = this.dropData.isp;
        this.sharedService.alert(
          'success',
          `campaign is: ${this.campaignStatus}`
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  resumeDrop() {
    if (this.dropData) {
      this.campaignStatus = 'active';
      this.productionService.sendDrop(this.dropData).subscribe(
        (res) => {
          this.sharedService.alert(
            'success',
            `campaign is: ${this.campaignStatus}`
          );
          console.log(res);
        },
        (err) => {
          this.sharedService.alert('error', err.error.message);
        }
      );
    } else {
      this.sharedService.alert('error', 'campaign Name not found');
    }
  }
}
