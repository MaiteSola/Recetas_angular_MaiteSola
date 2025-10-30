import { CommonModule } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { Recipe } from '../models/recetaModel';
import { Card } from "../card/card";



@Component({
  selector: 'app-cards-content',
  imports: [CommonModule, Card],
  templateUrl: './cards-content.html',
  styleUrl: './cards-content.scss',
})
export class CardsContent {
recipes = input.required<Recipe[]>();
  delete = output<number>();

  onDelete(index: number) {
    this.delete.emit(index);
  }

}
