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

  recipe: Recipe = {
    name: '',
    ingredients: [''],
    imageUrl: ''
  };

  // Estado de errores (simulando validaciones "servidor")
  errors = {
    name: false,
    ingredients: false,
    imageUrl: false,
  };

  showGeneralError = false;

  canAddIngredient(): boolean {
    if (this.recipe.ingredients.length === 0) return true;
    const last = this.recipe.ingredients.at(-1);
    return !!last && last.trim().length > 0;
  }

  addIngredient() {
    if (this.canAddIngredient()) {
      this.recipe.ingredients.push('');
    }
  }

  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
    if (this.recipe.ingredients.length === 0) {
      this.recipe.ingredients.push('');
    }
  }

  // 🔹 Simula validación de "servidor"
  validateRecipe(): boolean {
    this.errors = {
      name: this.recipe.name.trim() === '',
      ingredients: !this.recipe.ingredients.some((i) => i.trim() !== ''),
      imageUrl: this.recipe.imageUrl.trim() === '',
    };

    return !this.errors.name && !this.errors.ingredients && !this.errors.imageUrl;
  }

  onSubmit() {
    this.showGeneralError = false;

    const isValid = this.validateRecipe();

    if (!isValid) {
      this.showGeneralError = true;
      return;
    }

    // “Envía” al servidor (emit)
    const cleanRecipe: Recipe = {
      name: this.recipe.name.trim(),
      ingredients: this.recipe.ingredients.filter((i) => i.trim() !== ''),
      imageUrl: this.recipe.imageUrl.trim(),
    };

    this.save.emit(cleanRecipe);

    // Reset
    this.recipe = { name: '', ingredients: [''], imageUrl: '' };
    this.errors = { name: false, ingredients: false, imageUrl: false };
  }

  onCancel() {
    this.recipe = { name: '', ingredients: [''], imageUrl: '' };
    this.errors = { name: false, ingredients: false, imageUrl: false };
    this.showGeneralError = false;
  }
}
