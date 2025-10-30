import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Recipe } from '../models/recetaModel';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {

  @Input() recipe!: Recipe;
  //recipe = input<Recipe>();
  //delete = output<void>();

 @Output() delete = new EventEmitter<void>();

  onDelete() {
    this.delete.emit();
  }
}
