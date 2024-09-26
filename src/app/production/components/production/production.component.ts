import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductionService } from '../../services/production.service';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import Swal from 'sweetalert2';
import { SharedService } from '../../../shared/services/shared.service';
import { HttpClient } from '@angular/common/http';
import { RunCommandsService } from '../../../run-commands/services/run-commands.service';
import { LoginService } from '../../../login/services/login.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrl: './production.component.css',
})
export class ProductionComponent implements OnInit {
  ngOnInit(): void {
    // Clear sessionStorage when the component is initialized
    sessionStorage.clear();
  }
  placeholders: any = {};
  positionX = 0;
  positionY = 0;
  displayStyle = 'none';
  public headerText = `  From : 
  Subject : 
  Cc : 
  Bcc : 
  Reply-to : 
  Date : 
  Message-ID : 
  Mime-Version : 1
  X-Priority : 
  X-Custom-Header : 
  X-SG-EID : 
  X-Entity-ID : 
  X-Feedback-ID : 
  List-Unsubscribe : `;
  public bodyText = `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`;
  public recipienteText: any[] = [];
  public selectContentType = 'selectContentType';
  public selectTransEnc = 'selectTransEnc';
  public selectedOptions: { app_password: string; email: string }[] = [];
  enteredText: string = ''; // Declare a variable to store the entered text
  public isCompainExists = false;
  public afterTest = 1000;
  constructor(
    private service: ProductionService,
    private sharedService: SharedService,
    private runCommandService: RunCommandsService,
    private loginService: LoginService
  ) {}

  //show context menu
  showContextMenu(event: MouseEvent): void {
    event.preventDefault(); // Prevent the default context menu

    // Get the mouse position
    this.positionX = event.clientX - 250;
    this.positionY = event.clientY - 10;

    // Show the custom context menu
    this.displayStyle = 'block';
  }
  //hide context menu
  hideContextMenu(): void {
    this.displayStyle = 'none';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.hideContextMenu(); // Hide when user clicks anywhere else
  }

  TestAll() {
    console.log(this.loginService.user_name);
  }

  //Send Drop Email
  SendDrop() {
    this.showTextInput();
  }
  //send test email
  TestEmail() {
    this.sendEmail(true);
  }

  // Unified function for sending emails (Drop or Test)
  sendEmail(isTest: boolean) {
    // Data to send
    let data: any = {};

    // Validate recipient email for test
    if (!this.validateRecipients(this.recipienteText)) {
      // Handle invalid recipients here
      return;
    }

    // Validate selected sender email
    if (this.selectedOptions.length === 0) {
      this.sharedService.alert('error', 'Select an email');
      return;
    } else {
      data.login = this.selectedOptions;
    }

    if (!isTest) {
      if (this.service.dataListName == '') {
        this.sharedService.alert('error', 'select data list');
        return;
      } else {
        data.dataListName = this.service.dataListName;
      }
    }
    // Set content type and encoding
    let myContentType: any = document.getElementById(this.selectContentType);
    let contentTransferEncoding: any = document.getElementById(
      this.selectTransEnc
    );

    // Set content type (text or HTML)
    if (myContentType.value === 'text/plain') {
      data.text = this.bodyText;
    } else if (myContentType.value === 'text/html') {
      data.html = this.bodyText;
    } else {
      data.html = this.bodyText;
      data.text = 'Hello World'; // Fallback to plain text
    }

    // Set content transfer encoding
    data.contentTransferEncoding = contentTransferEncoding.value;

    // Add recipient email for test mode
    if (isTest) {
      data.recipientes = this.recipienteText;
      data.campaignName = `${this.loginService.user_name}`;
    }

    // Process headers (assuming headerText is formatted as "key: value")
    let lines = this.headerText.split('\n');
    lines.forEach((e) => {
      let line = e.trim().split(/:(.*)/s);
      if (line[0].trim() !== '' && line[1].trim() !== '') {
        let headerKey = line[0].toLowerCase().trim();
        let headerValue = line[1].trim();

        // Map special headers to the correct keys
        switch (headerKey) {
          case 'reply-to':
            headerKey = 'replyTo';
            break;
          case 'message-id':
            headerKey = 'messageId';
            break;
          case 'x-sg-eid':
            headerKey = 'xSgEid';
            break;
          case 'x-entity-id':
            headerKey = 'xEntityId';
            break;
          case 'x-feedback-id':
            headerKey = 'xFeedbackId';
            break;
          case 'list-unsubscribe':
            headerKey = 'listUnsubscribe';
            break;
          case 'mime-version':
            headerKey = 'mimeVersion';
            break;
          case 'x-priority':
            headerKey = 'xPriority';
            break;
          case 'x-custom-header':
            headerKey = 'xCustomHeader';
            break;
        }
        data[headerKey] = headerValue;
      }
    });

    // Get placeholders from sessionStorage
    this.placeholders = JSON.parse(sessionStorage.getItem('placeholders')!);
    if (this.placeholders) {
      data.placeholders = this.placeholders;
    }

    // Additional fields for Drop emails
    if (!isTest) {
      data.country = this.service.emaillistFilter.country;
      data.isp = this.service.listFilter.isp;
      data.startFrom = this.service.startFrom * 1;
      data.count = this.service.count * 1;
      data.duplicate = this.service.duplicate * 1;
      data.campaignName = this.enteredText;
      data.testEmail = this.recipienteText.join('');
      data.afterTest = this.afterTest * 1;
      if (!this.service.listFilter.hasOwnProperty('email_type')) {
        this.sharedService.alert('error', 'Select data type');
        return;
      }

      data.email_type = this.service.listFilter.email_type;
    }
    data.service = this.sharedService.selectSenderIsp;

    // Call the respective API endpoint
    const serviceMethod = isTest
      ? this.service.sendTest(data)
      : this.service.sendDrop(data);

    serviceMethod.subscribe(
      (response) => {
        this.sharedService.alert('success', isTest ? 'Test Sent' : 'Drop Sent');
      },
      (error) => {
        console.error('Error occurred while sending data:', error);
      }
    );
  }

  Help() {
    Swal.fire({
      title: '<h3>short keys</h3>',
      width: 800,
      icon: 'info',
      html: `
      <div class="row " >
      <div class="col " >random("text") or random("t"):</div>
      <div class="col" >to get random text lowercase</div>
      </div>

      <div class="row" >
      <div class="col" >random("TEXT") or random("T"):</div>
      <div class="col" >to get random text uppercase</div>
      </div>

      <div class="row" >
      <div class="col" >random("number") or random("n"):</div>
      <div class="col" >to get random number</div>
      </div>

            <div class="row" >
      <div class="col" >[p_1] :</div>
      <div class="col" >for fisrt placeholder</div>
      </div>
      `,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
      confirmButtonAriaLabel: 'Thumbs up, great!',
    });
  }

  // Function to validate the email
  validateRecipients(recipients: any[]): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!recipients || recipients.length === 0) {
      this.sharedService.alert(
        'error',
        'Invalid recipient email: no emails provided'
      );

      return false;
    }
    for (const email of recipients) {
      if (!emailRegex.test(email)) {
        this.sharedService.alert('error', `Invalid recipient email: ${email}`);

        return false;
      }
    }

    return true; // All recipients are valid
  }

  showTextInput() {
    const generatedName =
      this.service.listFilter.isp.toLowerCase() +
      this.sharedService.generateRandomString(15);

    Swal.fire({
      title: 'Campaign Name',
      input: 'text',
      inputValue: generatedName,
      inputPlaceholder: 'Enter some text',
      inputAttributes: {
        maxlength: '50', // SweetAlert expects a string for maxlength
        autocapitalize: 'off',
        autocorrect: 'off',
        disabled: 'true', // Convert boolean to string
      },
      showCancelButton: true, // Option to cancel the input
    }).then((result) => {
      if (result.isConfirmed) {
        this.enteredText = result.value; // Store the entered text in a component variable
        this.runCommandService.getDropByName(this.enteredText).subscribe(
          (res: any) => {
            this.isCompainExists = res.drop.length > 0;
            if (!this.isCompainExists) {
              this.sendEmail(false);
            } else {
              this.sharedService.alert('error', 'campaign name already exists');
            }
          },
          (err) => {
            console.log(err);
          }
        );
      } else if (result.isDismissed) {
        Swal.fire('Drop Cancel');
      }
    });
  }
}
