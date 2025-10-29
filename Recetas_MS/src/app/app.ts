import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Footer } from "./footer/footer";
import { Recipe } from './models/recetaModel';


@Component({
  selector: 'app-root',
  imports: [Navbar,Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})



// TODO: 
export class App {
  protected readonly title = signal('Recetas_MS');
 recipes: Recipe[] = [];

  filterRecipes(term: string) {
    console.log('Buscar:', term);
    // Aquí filtrarás más tarde
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    console.log('Receta añadida:', recipe);
    console.log('Total recetas:', this.recipes);
  }
}