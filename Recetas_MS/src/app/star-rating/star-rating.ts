import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [DecimalPipe],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
})
export class StarRating {
  @Input() rating: number = 0; // La nota media actual (ej: 4.5)
  @Input() readOnly: boolean = false; // True = solo ver, False = se puede votar
  @Output() ratingClicked = new EventEmitter<number>(); // Emite el valor votado (1-5)

  // Array auxiliar para generar 5 estrellas en el HTML
  stars: number[] = [1, 2, 3, 4, 5];

  onClick(starValue: number): void {
    if (!this.readOnly) {
      this.ratingClicked.emit(starValue);
    }
  }
}
