import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipientes',
  templateUrl: './recipientes.component.html',
  styleUrl: './recipientes.component.css',
})
export class RecipientesComponent {
  public textareaId = 'txt-recipientes';

  @Output() public child = new EventEmitter();
  public txtValue = '';
  //textarea seleted id

  textintextarea(e: any) {
    this.txtValue = e.target.value.split('\n');
    this.child.emit(this.txtValue);
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
}
