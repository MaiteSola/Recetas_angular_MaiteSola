import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Recipe } from '../models/recetaModel';
import { Card } from "../card/card";



@Component({
  selector: 'app-cards-content',
  imports: [CommonModule, Card],
  templateUrl: './cards-content.html',
  styleUrl: './cards-content.scss',
})
export class CardsContent {
// 👇 Recibe la lista desde el padre (solo lectura)
  recipes = input<Recipe[]>([]);

  // 👇 Emite eventos al padre
  delete = output<number>();
  add = output<Recipe>();

  // 🔹 Llamado al pulsar un botón "Eliminar"
  onDelete(index: number) {
    this.delete.emit(index);
  }

  // 🔹 Llamado al pulsar un botón "Añadir receta"
  onAddRecipe(newRecipe: Recipe) {
    this.add.emit(newRecipe);
  }

}
