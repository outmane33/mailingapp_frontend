import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input() message: string = '';
  showAlert: boolean = false;

  // Method to show the alert
  showError(message: string) {
    this.message = message;
    this.showAlert = true;

    // Automatically close the alert after 3 seconds
    setTimeout(() => this.closeAlert(), 3000);
  }

  // Method to close the alert
  closeAlert() {
    this.showAlert = false;
  }
}
