import {
  Component,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public initHeader: string = `  From : 
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
  @Output() public child = new EventEmitter();
  public txtValue = '';
  //textarea seleted id
  textareaId = 'one-1';

  textintextarea(e: any) {
    this.txtValue = e.target.value;
    this.child.emit(this.txtValue);
  }

  // read file step 1
  @ViewChild('fileInput') fileInput: ElementRef | undefined; // To reference the hidden file input
  fileContent: string | ArrayBuffer | null = '';

  public headers = [
    [
      // link id
      'header-1',
      // link href
      'header-send-1',
      // textarea id
      'one-1',
      // link class
      'nav-link active ',
      // div class
      'tab-pane fade show active',
    ],
  ];

  // read file step 2
  // Method to programmatically trigger the file input click
  triggerFileInput(): void {
    this.fileInput?.nativeElement.click(); // Simulate click on hidden file input
  }

  //clear header
  clearHeader() {
    let txtarea: any = document.getElementById(this.textareaId);
    txtarea.value = '';
  }
  //GET Textarea seleted id
  getTextAreaId(id: any) {
    this.textareaId = id;
  }
  // Add New Header
  addHeader() {
    this.headers.push([
      `header-${this.headers.length + 1}`,
      `header-send-${this.headers.length + 1}`,
      `one-${this.headers.length + 1}`,
      'nav-link',
      'tab-pane fade show',
    ]);
  }
  // Close Select Header
  closeHeader(header: any) {
    this.headers.forEach((e) => {
      if (e[0] == header[0]) {
        this.headers.splice(this.headers.indexOf(e), 1);
      }
    });
  }
  // Random Array
  shuffleArray(arr: any) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
  }

  // Random Header
  randomHeader() {
    let txtarea: any = document.getElementById(this.textareaId);
    let txtarea_Array = txtarea.value.split('\n');
    let new_txtarea_Ar = this.shuffleArray(txtarea_Array);

    txtarea.value = new_txtarea_Ar.join('\n');
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
