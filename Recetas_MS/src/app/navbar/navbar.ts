import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Form } from '../form/form';
import { Receta } from '../models/recetaModel';
import { RecetasService } from '../services/recetas';
import { StarRating } from '../star-rating/star-rating';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule, Form,StarRating],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  public recetasService = inject(RecetasService);
  menuOpen = false;
  showModal = false;
  searchTerm = '';

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openModal() {
    this.showModal = true;
    this.menuOpen = false;
  }

  closeModal() {
    this.showModal = false;
  }

  onSearch() {
    this.recetasService.buscar(this.searchTerm);
  }

  
  filtrarPorEstrellas(estrellas: number) {
    // Lógica "Toggle": Si pulso lo que ya hay, reseteo a 0. Si no, pongo el nuevo.
    if (this.recetasService.minRating() === estrellas) {
       this.recetasService.filtrarPorEstrellas(0);
    } else {
       this.recetasService.filtrarPorEstrellas(estrellas);
    }
  }
}
