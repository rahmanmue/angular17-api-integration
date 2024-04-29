import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-add.component.html',
  styleUrl: './modal-add.component.scss'
})
export class ModalAddComponent {
  @Output() addDataEvent = new EventEmitter<FormGroup>();
 
  
  addDataForm = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    roomAvailable : new FormControl('', Validators.required),
    price : new FormControl('', Validators.required),
    imageLink : new FormControl('', Validators.required)
  })
  
  
  addData(){
    if(!this.addDataForm.valid){
      alert("Form is invalid")
      return
    }
    this.addDataEvent.emit(this.addDataForm);
  }

 
}
