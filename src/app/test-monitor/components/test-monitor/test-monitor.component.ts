import { Component } from '@angular/core';
import { TestMonitorService } from '../../services/test-monitor.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-test-monitor',
  templateUrl: './test-monitor.component.html',
  styleUrl: './test-monitor.component.css',
})
export class TestMonitorComponent {
  public tests: any[] = [];
  public result: any = 0;
  public page: number = 1;
  public mypage: number = 1;
  public limit: number = 5;
  public totalPages: number = 1;
  public totalTests: number = 0;
  public total: number = 0;
  public campaignName: string = '';
  public filters: any = {}; // To store the filters like status, isp, campaignName, lists, etc.

  constructor(
    private testService: TestMonitorService,
    private sharedService: SharedService
  ) {
    this.getAllTests();
  }

  // Function to get tests with optional filters and pagination parameters
  getAllTests(params?: {
    page?: number;
    limit?: number;
    opens?: number;
    clicks?: number;
    campaignName?: string;
    mailer?: string;
    affiliate_network?: string;
    offer?: string;
    isp?: string;
  }) {
    this.total = 0;
    const page = params?.page || this.page;
    const limit = params?.limit || this.limit;

    // Merge filters with the passed params
    const queryParams = { ...this.filters, page, limit, ...params };

    this.testService.getAllTests(queryParams).subscribe(
      (res: any) => {
        this.tests = res.data;
        this.mypage = res.page;
        this.result = res.result;
        this.totalPages = res.totalPages;
        this.totalTests = res.totalTests;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  // Navigate to the next page
  nextPage() {
    if (this.page < this.totalPages) {
      this.page += 1;
      this.getAllTests({ page: this.page, limit: this.limit });
    }
  }

  // Navigate to the previous page
  prevPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.getAllTests({ page: this.page, limit: this.limit });
    }
  }

  // Handle enter press and validate page number
  onEnterPressPage(e: any): void {
    const pageNumber = Number(e.target.value);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.getAllTests({ page: this.page, limit: this.limit });
    } else {
      this.sharedService.alert('error', 'Invalid page number');
    }
  }
  // Handle campaign name search and filter drops
  onEnterPressCampaignName(e: any): void {
    const campaignName = e.target.value;
    this.filters.campaignName = campaignName.trim() !== '' ? campaignName : '';
    this.getAllTests({ page: this.page, limit: this.limit });
  }
  // Handle ISP selection change
  ispList = ['', 'Charter', 'RR'];
  onSelectChangeIsp(e: any) {
    const isp = e.target.value; // Get the selected value
    this.filters.isp = isp.trim() !== '' ? isp : '';
    this.getAllTests({ page: this.page, limit: this.limit });
  }

  // Handles select change for limit
  onSelectChangeLimit(event: any): void {
    const limit = event.target.value;
    this.limit = Number(limit);
    this.getAllTests({ page: this.page, limit: this.limit });
  }

  // Handle mailer name search and filter tests
  onEnterPressMailer(e: any): void {
    const mailer = e.target.value;
    this.filters.mailer = mailer.trim() !== '' ? mailer : '';
    this.getAllTests({ page: this.page, limit: this.limit });
  }

  // Handle affiliate_network name search and filter tests
  onEnterPressAffiliateNetwork(e: any): void {
    const affiliate_network = e.target.value;
    this.filters.affiliate_network =
      affiliate_network.trim() !== '' ? affiliate_network : '';
    this.getAllTests({ page: this.page, limit: this.limit });
  }
  // Handle offer name search and filter tests
  onEnterPressOffer(e: any): void {
    const offer = e.target.value;
    this.filters.offer = offer.trim() !== '' ? offer : '';
    this.getAllTests({ page: this.page, limit: this.limit });
  }

  // Handle opens name search and filter tests
  onEnterPressOpens(e: any): void {
    const opens = e.target.value;
    this.filters.opens = opens.trim() !== '' ? opens : '';
    this.getAllTests({ page: this.page, limit: this.limit });
  }
  // Handle offer name search and filter tests
  onEnterPressClicks(e: any): void {
    const clicks = e.target.value;
    this.filters.clicks = clicks.trim() !== '' ? clicks : '';
    this.getAllTests({ page: this.page, limit: this.limit });
  }
}
