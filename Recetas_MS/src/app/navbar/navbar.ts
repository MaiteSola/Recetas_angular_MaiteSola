import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Form } from '../form/form';
import { RecetasService } from '../services/recetas';
import { StarRating } from '../star-rating/star-rating';

@Component({
  selector: 'app-navbar',
  standalone: true, // Asumimos standalone por los imports
  imports: [FormsModule, CommonModule, Form, StarRating],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  
  // 1. INYECCIÓN DE SERVICIOS
  // Público para poder acceder a signals (minRating) desde el HTML
  public recetasService = inject(RecetasService);

  // 2. ESTADO DEL COMPONENTE
  menuOpen = false;   // Controla el menú hamburguesa en móvil
  showModal = false;  // Controla la visibilidad del formulario
  searchTerm = '';    // Vinculado al input de búsqueda

  // --- LÓGICA DE UI (Interfaz) ---

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openModal() {
    this.showModal = true;
    this.menuOpen = false; // Cerramos el menú al abrir el modal (UX)
  }

  closeModal() {
    this.showModal = false;
  }

  // --- LÓGICA DE NEGOCIO (Busqueda y Filtros) ---

  /**
   * Se ejecuta cada vez que el usuario escribe en el input search
   */
  onSearch() {
    this.recetasService.buscar(this.searchTerm);
  }

  /**
   * Gestiona el clic en las estrellas del filtro
   * @param estrellas Número de estrellas seleccionadas
   */
  filtrarPorEstrellas(estrellas: number) {
    // Lógica "Toggle": Si pulso lo que ya hay activo, reseteo a 0.
    // Si pulso algo nuevo, aplico el filtro.
    if (this.recetasService.minRating() === estrellas) {
       this.recetasService.filtrarPorEstrellas(0);
    } else {
       this.recetasService.filtrarPorEstrellas(estrellas);
    }
  }
}