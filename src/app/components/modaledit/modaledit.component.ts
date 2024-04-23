import { Component, Input } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { Houses } from '../../interfaces/houses';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-modaledit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modaledit.component.html',
  styleUrl: './modaledit.component.scss'
})
export class ModaleditComponent {
  @Input() itemEdit! : Houses;
  @Input() callback! : any;
  

  editDataForm! : FormGroup;

  constructor(private houseService: HouseService){
    this.editDataForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      roomAvailable : new FormControl('', Validators.required),
      price : new FormControl('', Validators.required),
      imageLink : new FormControl('', Validators.required), 
    })
  }

  ngOnChanges(): void {
    if (this.itemEdit) {
      this.editDataForm.patchValue({
        id: this.itemEdit.id,
        name: this.itemEdit.name,
        location: this.itemEdit.location,
        roomAvailable: this.itemEdit.roomAvailable,
        price: this.itemEdit.price,
        imageLink: this.itemEdit.imageLink
      });
    }

  }

  editData(){
    const id = this.editDataForm.value.id;
    const body = this.editDataForm.value;
    this.houseService.updateHouse(id, body).subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    });

  }


}
