import { Component, inject, Input, input, output } from '@angular/core';
import { Receta } from '../models/recetaModel';
import { RecetasService } from '../services/recetas';
import { StarRating } from '../star-rating/star-rating';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [StarRating, CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  // Recibe la receta individual del bucle del contenedor
  recipe = input.required<Receta>();

  // Si quieres borrar desde la card, inyectas el servicio AQUÍ también
  private recetasService = inject(RecetasService);

  eliminar() {
    this.recetasService.borrarReceta(this.recipe().id);
  }

  // Lógica para calcular la nueva media
  votar(puntuacionUsuario: number) {
    // 1. Extraemos el valor actual de la signal para trabajar más cómodo
    const recetaActual = this.recipe();

    // 2. Protegemos contra nulos (|| 0)
    const votosActuales = recetaActual.votos || 0;
    const mediaActual = recetaActual.rating || 0;

    // 3. Matemáticas
    const nuevosVotosTotal = votosActuales + 1;
    const nuevaMedia = (mediaActual * votosActuales + puntuacionUsuario) / nuevosVotosTotal;

    // 4. Objeto para enviar a la API
    const datosActualizados = {
      rating: nuevaMedia,
      votos: nuevosVotosTotal,
    };

    this.recetasService.actualizarReceta(recetaActual.id.toString(), datosActualizados).subscribe({
      next: (recetaRespuesta) => {
        console.log('Voto registrado:', recetaRespuesta);
        this.recetasService.actualizarSignalReceta(recetaRespuesta);
      },
      error: (e) => console.error('Error al votar', e),
    });
  }
}
