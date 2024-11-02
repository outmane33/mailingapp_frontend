import {
  Component,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-manage-data',
  templateUrl: './manage-data.component.html',
  styleUrls: ['./manage-data.component.css'], // fixed the typo from styleUrl to styleUrls
})
export class ManageDataComponent {
  fileContent: any = null;
  senders: any[] = [];
  selectISP = 'selectISP';
  selectDataType = 'selectDataType';
  selectDataProvider = 'selectDataProvider';
  selectCountries = 'selectCountries';
  selectInitialEmailsType = 'selectInitialEmailsType';
  disableInput = false;
  allDataNames: any[] = [];
  allData: any = {};
  arr = [1, 2, 3];
  // -------------------------------
  public result: any = 0;
  public page: number = 1;
  public mypage: number = 1;
  public limit: number = 5;
  public totalPages: number = 1;
  public totalData: number = 0;
  public filters: any = {}; // To store the filters like status, isp, campaignName, lists, etc.
  // Use ViewChild to get a reference to the file input

  constructor(
    private httpService: DataService,
    private cdRef: ChangeDetectorRef,
    private sharedService: SharedService
  ) {
    this.getAllDataNames();
    this.getAllData();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      if (file) {
        this.readFile(file);
      }
    }
  }

  readFile(file: File): void {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      this.fileContent = fileReader.result; // Stores the file content
    };

    fileReader.readAsText(file);
  }

  //Send Data to BckEnd
  sendData(fileInput: any): void {
    // get selected isp
    let myisp: any = document.getElementById(this.selectISP);
    // get selected data type
    let myDataType: any = document.getElementById(this.selectDataType);
    // get selected data provider
    let mydataProvider: any = document.getElementById(this.selectDataProvider);
    // get selected data country
    let mycountry: any = document.getElementById(this.selectCountries);
    // get selected email type
    let myInitialEmailsType: any = document.getElementById(
      this.selectInitialEmailsType
    );
    // check if file is vide
    if (!this.fileContent) {
      this.sharedService.alert('error', 'No file content available');
      return;
    }

    // Split the file content into an array of lines, where each line is a separate email and password pair.
    let emails = this.fileContent.split('\n');
    if (myDataType.value == 'Senders') {
      // Loop through each line of the file content
      for (let x = 0; x < emails.length; x++) {
        let email_and_pass = emails[x].replace('\r', '').split(':');
        // Check if either the email or password is missing;
        if (email_and_pass[0] === '' || email_and_pass[1] === '') {
          continue;
        }
        // If both email and password are present, push them as an object into the `senders` array
        this.senders.push({
          email: email_and_pass[0],
          password: email_and_pass[1],
        });
      }
    } else {
      this.senders.push(...emails);
    }
    fileInput.value = '';
    const data = {
      emails: this.senders,
      dataType: myDataType.value,
      mydataProvider: mydataProvider.value,
      mycountry: mycountry.value,
      myInitialEmailsType: myInitialEmailsType.value,
    };

    this.httpService.sendSendersData(data, myisp.value).subscribe(
      (response) => {
        this.sharedService.alert('success', 'Data sent successfully');

        // Reset the file input after successful data sending
        this.fileContent = null; // Reset fileContent
        this.senders = []; // Clear senders array

        // Trigger Angular to recognize the change
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error occurred while sending data:', error);
      }
    );
  }

  cancel(fileInput: any) {
    fileInput.value = '';
    this.fileContent = '';
  }
  //disable input on chage data type
  dataTypeChange() {
    let dataTypeSelect: any = document.getElementById(this.selectDataType);
    if (dataTypeSelect.value == 'Senders') {
      this.disableInput = true;
    } else {
      this.disableInput = false;
    }
  }
  getAllDataNames() {
    this.httpService.getDataNames().subscribe(
      (res: any) => {
        this.allDataNames = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // Get all data info
  getAllData(params?: {
    page?: number;
    limit?: number;
    Total_Count?: number;
    data_provider?: string;
    Name?: string;
    Updated_At?: string;
  }) {
    const page = params?.page || this.page;
    const limit = params?.limit || this.limit;
    // Merge filters with the passed params
    const queryParams = { ...this.filters, page, limit, ...params };
    this.httpService.getAllData(queryParams).subscribe(
      (res: any) => {
        this.allData = res.data;
        this.totalPages = res.pagination.totalPages;
        this.totalData = res.pagination.totalItems;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getKeys(obj: any) {
    return Object.keys(obj);
  }
  // Navigate to the next page
  nextPage() {
    if (this.page < this.totalPages) {
      this.page += 1;
      this.getAllData({ page: this.page, limit: this.limit });
    }
  }
  // Navigate to the previous page
  prevPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.getAllData({ page: this.page, limit: this.limit });
    }
  }
  // Handle enter press and validate page number
  onEnterPressPage(e: any): void {
    const pageNumber = Number(e.target.value);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.getAllData({ page: this.page, limit: this.limit });
    } else {
      this.sharedService.alert('error', 'Invalid page number');
    }
  }
  // Handles select change for limit
  onSelectChangeLimit(event: any): void {
    const limit = event.target.value;
    this.limit = Number(limit);
    this.getAllData({ page: this.page, limit: this.limit });
  }

  // Handle Data Provider name search and filter data
  onEnterPressDataProvider(e: any): void {
    const data_provider = e.target.value;
    this.filters.data_provider =
      data_provider.trim() !== '' ? data_provider : '';
    this.getAllData({ page: this.page, limit: this.limit });
  }
  // Handle Data Provider name search and filter data
  onEnterPressName(e: any): void {
    const Name = e.target.value;
    this.filters.Name = Name.trim() !== '' ? Name : '';
    this.getAllData({ page: this.page, limit: this.limit });
  }
  // Handle Data Provider name search and filter data
  onEnterPressTotalCount(e: any): void {
    const Total_Count = e.target.value;
    this.filters.Total_Count = Total_Count.trim() !== '' ? Total_Count : '';
    this.getAllData({ page: this.page, limit: this.limit });
  }
  // Handle Data Provider name search and filter data
  onEnterPressUpdateAt(e: any): void {
    const Updated_At = e.target.value;
    this.filters.Updated_At = Updated_At.trim() !== '' ? Updated_At : '';
    this.getAllData({ page: this.page, limit: this.limit });
  }
}
