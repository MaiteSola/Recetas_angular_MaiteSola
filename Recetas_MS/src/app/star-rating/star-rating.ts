import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true, // Importante
  imports: [DecimalPipe], // Necesario para el pipe number:'1.1-1' en el HTML
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
})
export class StarRating {
  // CONFIGURACIÓN (Inputs)
  @Input() rating: number = 0;        // Nota a mostrar (ej: 4.5)
  @Input() readOnly: boolean = false; // ¿Es interactivo o solo lectura?

  // EVENTOS (Outputs)
  @Output() ratingClicked = new EventEmitter<number>(); // Avisa al padre del clic

  // Array auxiliar para pintar las 5 estrellas con @for
  stars: number[] = [1, 2, 3, 4, 5];

  // Gestiona el clic en una estrella
  onClick(starValue: number): void {
    if (!this.readOnly) {
      this.ratingClicked.emit(starValue);
    }
  }
}