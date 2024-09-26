import { Component } from '@angular/core';

@Component({
  selector: 'app-placeholders',
  templateUrl: './placeholders.component.html',
  styleUrl: './placeholders.component.css',
})
export class PlaceholdersComponent {
  public placeholders = [
    [
      // link id
      'placeholder-1',
      // link href
      'placeholder-send-1',
      // textarea id
      'p_1',
      // link class
      'nav-link active',
      // div class
      'tab-pane fade show active',
    ],
  ];
  //textarea seleted id
  textareaId = 'p_1';
  textAreaIds: any[] = ['p_1'];
  //GET Textarea seleted id
  getTextAreaId(id: any) {
    this.textareaId = id;
    if (!this.textAreaIds.includes(id)) {
      this.textAreaIds.push(id);
    }
  }

  //read placeholders and add it to sessionstorage
  readPlaceholders() {
    let placeholder: any = '';
    let myplaceholders: any = {};
    for (let x = 0; x < this.textAreaIds.length; x++) {
      placeholder = document.getElementById(this.textAreaIds[x]);
      myplaceholders[this.textAreaIds[x]] = placeholder.value;
    }
    sessionStorage.setItem('placeholders', JSON.stringify(myplaceholders));
  }

  // Add New Header
  addPlaceholder() {
    this.placeholders.push([
      `placeholder-${this.placeholders.length + 1}`,
      `placeholder-send-${this.placeholders.length + 1}`,
      `p_${this.placeholders.length + 1}`,
      'nav-link',
      'tab-pane fade show',
    ]);
  }
  //clear header
  clearPlaceholder() {
    let txtarea: any = document.getElementById(this.textareaId);
    txtarea.value = '';
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
  // Close Select Header
  closeHeader(header: any) {
    this.placeholders.forEach((e) => {
      if (e[0] == header[0]) {
        this.placeholders.splice(this.placeholders.indexOf(e), 1);
      }
    });
  }
}
