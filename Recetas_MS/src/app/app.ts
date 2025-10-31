import { Component, signal } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Recipe } from './models/recetaModel';
import { CardsContent } from './cards-content/cards-content';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, CardsContent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

// TODO:
export class App {
  title = signal('Recetas_MS');

  // 🔹 Lista principal de recetas (signal)
  recipes = signal<Recipe[]>([
    {
      name: 'Pasta Boloñesa',
      ingredients: ['Pasta', 'Tomate', 'Cebolla', 'Carne picada'],
      imageUrl: './img/pastaboloñesa.jpg',
    },
    {
      name: 'Ensaladilla Rusa',
      ingredients: ['Atún', 'Cebolla', 'Patata', 'Guisantes', 'Mayonesa'],
      imageUrl: './img/ensaladillarusa.jpg',
    },
    {
      name: 'Arroz con Pollo',
      ingredients: ['Arroz', 'Pollo', 'Cebolla'],
      imageUrl: './img/arrozpollo.avif',
    },
    {
      name: 'Aguacate Asado',
      ingredients: ['Aguacate', 'Cebolla', 'Huevo', 'Garbanzos'],
      imageUrl: './img/aguacateasado.jpg',
    },
  ]);

  // 🔹 Lista filtrada (se inicializa con todas)
  filteredRecipes = this.recipes();

  // Añadir nueva receta
  onAddRecipe(newRecipe: Recipe) {
    this.recipes.update((recs) => [...recs, newRecipe]);
    this.filteredRecipes = this.recipes(); // refrescar vista tras añadir
  }

  // Filtrar recetas por nombre
  onSearch(term: string) {
    const searchTerm = term.toLowerCase();
    this.filteredRecipes = this.recipes().filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm)
    );
  }

  // Eliminar receta por índice
  onDeleteRecipe(index: number) {
    const updated = this.filteredRecipes.filter((_, i) => i !== index);
    this.filteredRecipes = updated;
    this.recipes.set(updated);
  }
}
