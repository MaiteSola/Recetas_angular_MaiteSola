import { Component, EventEmitter, output, Output } from '@angular/core';
import { Recipe } from '../models/recetaModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {

  save = output<Recipe>();
  cancel = output<void>();
// @Output() save = new EventEmitter<Recipe>();
//   @Output() cancel = new EventEmitter<void>();

   // Modelo reactivo del formulario
  recipe: Recipe = {
    name: '',
    ingredients: [''],
    imageUrl: ''
  };

  // 🔹 Añadir ingrediente sin perder foco
  addIngredient() {
    this.recipe.ingredients.push('');
  }

  // 🔹 Eliminar ingrediente
  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }

  // 🔹 Evitar recrear los inputs
  trackByIndex(index: number, item: string) {
    return index;
  }

  // 🔹 Enviar formulario
  onSubmit() {
    const cleanRecipe: Recipe = {
      ...this.recipe,
      ingredients: this.recipe.ingredients.filter(i => i.trim()),
    };
    this.save.emit(cleanRecipe);
    this.resetForm();
  }

  // 🔹 Cancelar
  onCancel() {
    this.cancel.emit();
    this.resetForm();
  }

  // 🔹 Limpiar formulario sin perder referencias
  private resetForm() {
    this.recipe.name = '';
    this.recipe.ingredients = [''];
    this.recipe.imageUrl = '';
  }

}
