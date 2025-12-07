import { Component, EventEmitter, Input, Output, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Receta } from '../models/recetaModel'; // Asegúrate que la ruta es correcta
import { StarRating } from '../star-rating/star-rating';
import { VoteModal } from '../vote-modal/vote-modal';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, StarRating, VoteModal],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  // 1. INPUT (ENTRADA DE DATOS)
  // Usamos la nueva sintaxis de Signals. "required" obliga a que el padre nos pase datos.
  recipe = input.required<Receta>();

  // 2. OUTPUT (SALIDA DE EVENTOS)
  // Creamos el "chivato" para avisar al padre de que queremos borrar.
  // Devuelve un número (el ID de la receta).
  @Output() eliminarReceta = new EventEmitter<string>();

  // 3. ESTADO INTERNO (MODAL)
  modalAbierto = signal(false);

  // --- MÉTODOS VISUALES (MODAL) ---
  verDetalle() {
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
  }

  // --- MÉTODOS DE LÓGICA (BORRADO) ---
  onDelete(event: Event) {
    event.stopPropagation();
    // Ahora esto es válido porque recipe().id es string y el EventEmitter también
    this.eliminarReceta.emit(this.recipe().id); 
  }
}