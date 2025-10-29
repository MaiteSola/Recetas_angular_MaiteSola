import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../models/recetaModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
@Output() save = new EventEmitter<Recipe>();
  @Output() cancel = new EventEmitter<void>();

  recipe: Recipe = {
    name: '',
    ingredients: [''],
    imageUrl: ''
  };

  addIngredient() {
    this.recipe.ingredients.push('');
  }

  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }

  onSubmit() {
    const cleanRecipe = {
      ...this.recipe,
      ingredients: this.recipe.ingredients.filter(i => i.trim())
    };
    this.save.emit(cleanRecipe);
  }

  onCancel() {
    this.cancel.emit();
  }
  

}
