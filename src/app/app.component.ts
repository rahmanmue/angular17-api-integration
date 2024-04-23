import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HouseService } from './services/house.service';
import { Houses } from './interfaces/houses';
import { ModaleditComponent } from './components/modaledit/modaledit.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, ModaleditComponent, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-crud';
  houses : Houses[] = []
  error! : string;
  completed : boolean = false;

  constructor(private houseService: HouseService){
    this.getHouses()
  }

  ngOnchanges(){
    this.getHouses()
  }

  getHouses(){
    this.houseService.getHouses().subscribe({
      next: data => this.houses = data,
      error : err => this.error = err,
      complete :() => this.completed = true,
    })
  }   

  onClickDelete(id:any){
    this.houseService.deleteHouse(id).subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    });
    this.getHouses()
  }

  itemEdit! : Houses;

  onClickEdit(item: Houses){
    this.itemEdit = item;
    console.log(this.itemEdit)
  }

  addDataForm = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    roomAvailable : new FormControl('', Validators.required),
    price : new FormControl('', Validators.required),
    imageLink : new FormControl('', Validators.required)
  })

  addData(){
    if(!this.addDataForm.valid){
      alert("Form is not valid")
      return
    }else{
      console.log(this.addDataForm.value)
      this.houseService.addHouse(this.addDataForm.value).subscribe();
      this.getHouses();
      this.addDataForm.reset();
    }
  }

  editData(id:number, body:any){
    this.houseService.updateHouse(id, body).subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    });
    this.getHouses();
  }

}
