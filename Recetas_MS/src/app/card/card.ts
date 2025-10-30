import { Component, input, output} from '@angular/core';
import { Recipe } from '../models/recetaModel';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {

  recipe = input.required<Recipe>();
  delete = output<void>();

  onDelete() {
    this.delete.emit();
  }
}
