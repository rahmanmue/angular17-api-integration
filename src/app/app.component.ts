import { Component } from '@angular/core';
import { HouseService } from './services/house.service';
import { Houses } from './interfaces/houses';
import { CardHouseComponent } from './components/card-house/card-house.component';
import { ModalAddComponent } from './components/modal-add/modal-add.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CardHouseComponent, 
    ModalAddComponent, 
    ModalEditComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-crud';
  houses : Houses[] = []
  itemEdit! : Houses;
  error! : string;
  completed : boolean = false;

  constructor(private houseService: HouseService){
    this.getHouses()
  }

  ngOnchanges(){
    this.getHouses()
  }

  onClickEdit(item: Houses){
    this.itemEdit = item;
  }

  getHouses(){
    this.houseService.getHouses().subscribe({
      next: data => this.houses = data,
      error : err => this.error = err,
      complete :() => this.completed = true,
    })
  }  

  addData(addDataForm: FormGroup){
    console.log(addDataForm);
    if(!addDataForm?.valid){
      alert("Form is not valid")
      return
    }else{
      console.log(addDataForm.value)
      this.houseService.postHouse(addDataForm.value).subscribe();
      this.getHouses();
      addDataForm.reset();
    }
  }

  editData(editDataForm:FormGroup){
    let id : number = editDataForm.value.id as number;
    this.houseService.putHouse(id, editDataForm.value).subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    });
    this.getHouses();
  }

  deleteData(id:number){
    this.houseService.deleteHouse(id).subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    });
    this.getHouses()
  }

}
