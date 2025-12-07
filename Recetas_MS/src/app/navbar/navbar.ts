import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Form } from '../form/form';
import { Receta } from '../models/recetaModel';
import { RecetasService } from '../services/recetas';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule, Form],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private recetasService = inject(RecetasService);
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
}
