import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Form } from "../form/form";
import { Recipe } from '../models/recetaModel';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule, Form],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
@Output() search = new EventEmitter<string>();
  @Output() recipeCreated = new EventEmitter<Recipe>(); // AÑADIDO

  searchTerm = '';
  activeSection = 'inicio';
  showModal = false;

  onSearch() {
    this.search.emit(this.searchTerm.trim());
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  scrollTo(section: string) {
    this.activeSection = section;
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  onSaveRecipe(recipe: Recipe) {
    console.log('Receta guardada en navbar:', recipe);
    this.recipeCreated.emit(recipe); // Emite al padre
    this.closeModal();
  }

}
