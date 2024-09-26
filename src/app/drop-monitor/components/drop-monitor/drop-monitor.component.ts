import { Component } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { RunCommandsService } from '../../../run-commands/services/run-commands.service';
import { ProductionService } from '../../../production/services/production.service';

@Component({
  selector: 'app-drop-monitor',
  templateUrl: './drop-monitor.component.html',
  styleUrl: './drop-monitor.component.css',
})
export class DropMonitorComponent {
  public drops: any[] = [];
  public result: any = 0;
  public page: number = 1;
  public mypage: number = 1;
  public limit: number = 5;
  public totalPages: number = 1;
  public totalDrops: number = 0;
  public totalDelivered: number = 0;
  public total: number = 0;
  public campaignName: string = '';
  public dropData: any = {};
  public filters: any = {}; // To store the filters like status, isp, campaignName, lists, etc.

  constructor(
    private sharedService: SharedService,
    private service: RunCommandsService,
    private productionService: ProductionService
  ) {
    this.getAllDrops();
  }

  // Function to get drops with optional filters and pagination parameters
  getAllDrops(params?: {
    page?: number;
    limit?: number;
    campaignName?: string;
    status?: string;
    isp?: string;
    dataListName?: string;
  }) {
    this.totalDelivered = 0;
    this.total = 0;
    const page = params?.page || this.page;
    const limit = params?.limit || this.limit;

    // Merge filters with the passed params
    const queryParams = { ...this.filters, page, limit, ...params };

    this.sharedService.getAllDrops(queryParams).subscribe(
      (res: any) => {
        this.drops = res.data;
        this.mypage = res.page;
        this.result = res.result;
        this.totalPages = res.totalPages;
        this.totalDrops = res.totalDrops;

        // Calculate totals
        this.totalDelivered = this.drops.reduce(
          (sum, e) => sum + e.lastStartIndex,
          0
        );
        this.total = this.drops.reduce((sum, e) => sum + e.total, 0);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Handles select change for limit
  onSelectChangeLimit(event: any): void {
    const limit = event.target.value;
    this.limit = Number(limit);
    this.getAllDrops({ page: this.page, limit: this.limit });
  }

  // Navigate to the next page
  nextPage() {
    if (this.page < this.totalPages) {
      this.page += 1;
      this.getAllDrops({ page: this.page, limit: this.limit });
    }
  }

  // Navigate to the previous page
  prevPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.getAllDrops({ page: this.page, limit: this.limit });
    }
  }

  // Handle enter press and validate page number
  onEnterPressPage(e: any): void {
    const pageNumber = Number(e.target.value);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.getAllDrops({ page: this.page, limit: this.limit });
    } else {
      this.sharedService.alert('error', 'Invalid page number');
    }
  }

  // Handle checkbox selection for campaignName
  onCampaignSelect(campaignName: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.campaignName = checkbox.checked ? campaignName : ''; // Clear if unchecked
  }

  // Stop the selected campaign
  stopCampaign() {
    if (this.campaignName) {
      this.service.stopCampaign({ campaignName: this.campaignName }).subscribe(
        (res: any) => {
          this.sharedService.alert('success', res.message);
        },
        (err) => {
          this.sharedService.alert('error', err.error.message);
        }
      );
    } else {
      this.sharedService.alert('error', 'No campaign selected');
    }
  }

  // Pause the selected campaign
  pauseCampaign() {
    if (this.campaignName) {
      this.service.pauseCampaign({ campaignName: this.campaignName }).subscribe(
        (res: any) => {
          this.sharedService.alert('success', res.message);
        },
        (err) => {
          this.sharedService.alert('error', err.error.message);
        }
      );
    } else {
      this.sharedService.alert('error', 'No campaign selected');
    }
  }

  // Get drop data and resume campaign
  resumeDrop() {
    if (this.campaignName) {
      this.service.getDropByName(this.campaignName).subscribe(
        (res: any) => {
          this.dropData = res.drop[0];
          if (this.dropData) {
            this.productionService.sendDrop(this.dropData).subscribe(
              (res) => {
                this.sharedService.alert('success', `campaign is: active`);
                console.log(res);
              },
              (err) => {
                this.sharedService.alert('error', err.error.message);
              }
            );
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.sharedService.alert('error', 'Campaign name not found');
    }
  }

  // Resume campaign
  resumeCampaign() {
    if (this.campaignName) {
      this.service
        .resumeCampaign({ campaignName: this.campaignName })
        .subscribe(
          (res) => {
            this.resumeDrop();
          },
          (err) => {
            this.sharedService.alert('error', err.error.message);
          }
        );
    } else {
      this.sharedService.alert('error', 'No campaign selected');
    }
  }

  // Handle campaign name search and filter drops
  onEnterPressCampaignName(e: any): void {
    const campaignName = e.target.value;
    this.filters.campaignName = campaignName.trim() !== '' ? campaignName : '';
    this.getAllDrops({ page: this.page, limit: this.limit });
  }

  // Handle ISP selection change
  ispList = ['', 'Charter', 'RR'];
  statusList = ['', 'active', 'paused', 'stopped'];
  onSelectChangeIsp(e: any) {
    const isp = e.target.value; // Get the selected value
    this.filters.isp = isp.trim() !== '' ? isp : '';
    this.getAllDrops({ page: this.page, limit: this.limit });
  }

  // Handle Data List Name search
  onEnterPressList(e: any) {
    const dataListName = e.target.value;
    this.filters.dataListName = dataListName.trim() !== '' ? dataListName : '';
    this.getAllDrops({ page: this.page, limit: this.limit });
  }

  // Handle Status selection change
  selectedStatus: string = '';
  onSelectChangeStatus(e: any) {
    const status = e.target.value;
    this.filters.status = status.trim() !== '' ? status : '';
    this.getAllDrops({ page: this.page, limit: this.limit });
  }
}
