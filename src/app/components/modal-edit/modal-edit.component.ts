import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Houses } from '../../interfaces/houses';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.scss'
})
export class ModalEditComponent {
  @Input() item! :Houses;
  @Output() editDataEvent = new EventEmitter<FormGroup>();
  editDataForm! : FormGroup;

  constructor(){
    this.editDataForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      roomAvailable : new FormControl('', Validators.required),
      price : new FormControl('', Validators.required),
      imageLink : new FormControl('', Validators.required), 
    })
  }
  

  ngOnChanges(){
    if (this.item) {
      this.editDataForm.patchValue({
        id: this.item.id,
        name: this.item.name,
        location: this.item.location,
        roomAvailable: this.item.roomAvailable,
        price: this.item.price,
        imageLink: this.item.imageLink
      });
    }
  }

  editData(){
    if(!this.editDataForm.valid){
      alert("Form is invalid")
      return
    }
    this.editDataEvent.emit(this.editDataForm)
  }
}
