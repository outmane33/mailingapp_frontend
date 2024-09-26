import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  positionX = 0;
  positionY = 0;
  displayStyle = 'none';

  showContextMenu(event: MouseEvent): void {
    event.preventDefault(); // Prevent the default context menu

    // Get the mouse position
    this.positionX = event.clientX - 250;
    this.positionY = event.clientY - 10;

    // Show the custom context menu
    this.displayStyle = 'block';
  }

  hideContextMenu(): void {
    this.displayStyle = 'none';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.hideContextMenu(); // Hide when user clicks anywhere else
  }
}
