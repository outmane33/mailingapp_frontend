import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {
  public headerInit = `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`;
  @Output() public child = new EventEmitter();
  public txtValue = '';

  textintextarea(e: any) {
    this.txtValue = e.target.value;
    this.child.emit(this.txtValue);
  }

  // read file step 1
  @ViewChild('fileInput') fileInput: ElementRef | undefined; // To reference the hidden file input
  fileContent: string | ArrayBuffer | null = '';

  //textarea seleted id
  textareaId = 'txt-body';

  // read file step 2
  // Method to programmatically trigger the file input click
  triggerFileInput(): void {
    this.fileInput?.nativeElement.click(); // Simulate click on hidden file input
  }
  // read file step 3
  // Method to handle file selection and read its content
  onFileSelected(event: any): void {
    const file: File = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileContent = reader.result; // Store file content
        let txtarea: any = document.getElementById(this.textareaId);
        txtarea.value = this.fileContent;
      };

      reader.readAsText(file); // Read the file as text
    }
  }
}
