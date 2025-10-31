import { CommonModule } from '@angular/common';
import { Component, output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Form } from '../form/form';
import { Recipe } from '../models/recetaModel';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule, Form],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  search = output<string>();
  recipeCreated = output<Recipe>();

  searchTerm = '';
  activeSection = 'inicio';
  showModal = false;

  // 🔹 Control del menú hamburguesa
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  // 🔹 Modal
  openModal() {
    this.showModal = true;
    this.closeMenu();
  }

  closeModal() {
    this.showModal = false;
  }

  onSaveRecipe(recipe: Recipe) {
    this.recipeCreated.emit(recipe);
    this.closeModal();
  }

  // Búsqueda
  onSearch() {
    this.search.emit(this.searchTerm.trim());
  }

  // Scroll
  scrollTo(section: string) {
    this.activeSection = section;
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    this.closeMenu();
  }
}
