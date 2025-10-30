import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Recipe } from './models/recetaModel';
import { CardsContent } from './cards-content/cards-content';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, CardsContent,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

// TODO:
export class App {
onChildDelete($event: number) {
 this.recipes = this.recipes.filter((_, i) => i !== $event);
}
  protected readonly title = signal('Recetas_MS');
  
   recipes: Recipe[] = [
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
  ];

  // Recibe el índice de la receta a eliminar desde el hijo
  onDeleteRecipe(index: number) {
    this.recipes = this.recipes.filter((_, i) => i !== index);
  }

  // Recibe una nueva receta desde el hijo
  onAddRecipe(newRecipe: Recipe) {
    this.recipes = [...this.recipes, newRecipe];
  }

   

  //Mirar si me hacen falta estos dos
  filterRecipes(term: string) {
    console.log('Buscar:', term);
    // Aquí filtrarás más tarde
  }
  
 
}
