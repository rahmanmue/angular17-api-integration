import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Houses } from '../../interfaces/houses';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-house',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './card-house.component.html',
  styleUrl: './card-house.component.scss'
})
export class CardHouseComponent {
  @Input() item!:Houses;
  @Output() deleteDataEvent = new EventEmitter<number>();
  @Output() handleEditEvent = new EventEmitter<Houses>();

  onClickEdit(item: Houses){
    this.handleEditEvent.emit(item);
  }

  handleDelete(id:number){
    this.deleteDataEvent.emit(id)
  }


}
