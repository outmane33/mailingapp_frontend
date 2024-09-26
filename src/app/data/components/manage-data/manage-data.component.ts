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
  // Use ViewChild to get a reference to the file input

  constructor(
    private httpService: DataService,
    private cdRef: ChangeDetectorRef,
    private sharedService: SharedService
  ) {
    this.getAllDataNames();
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
}
