import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
  inputForm : FormGroup;

  constructor(){
    this.inputForm = new FormGroup({
      name : new FormControl('', [
        Validators.required
      ]),
    })
  }

  getTask(){
    console.log(this.inputForm.value); 
  }
}
