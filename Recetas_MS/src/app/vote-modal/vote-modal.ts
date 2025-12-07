import { CommonModule } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { StarRating } from '../star-rating/star-rating';
import { Receta } from '../models/recetaModel';
import { RecetasService } from '../services/recetas'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-vote-modal',
  standalone: true,
  imports: [CommonModule, StarRating],
  templateUrl: './vote-modal.html',
  styleUrl: './vote-modal.scss',
})
export class VoteModal {
  // DATOS DE ENTRADA/SALIDA
  receta = input.required<Receta>(); // Receta que vamos a votar
  close = output<void>();            // Señal para cerrar el modal

  // INYECCIÓN DE SERVICIOS
  private recetasService = inject(RecetasService);

  // ESTADO TEMPORAL DEL MODAL
  puntuacionSeleccionada = signal(0); // Voto que el usuario está eligiendo
  enviando = signal(false);           // Estado de carga (Loading...)

  // --- LÓGICA DE INTERACCIÓN ---

  // Guarda el voto temporalmente (aún no se envía a la API)
  actualizarPuntuacionTemp(puntos: number) {
    this.puntuacionSeleccionada.set(puntos);
  }

  // --- LÓGICA DE NEGOCIO (Transacción de Voto) ---

  confirmarVoto() {
    // 1. Validación: No se puede enviar un voto vacío
    if (this.puntuacionSeleccionada() === 0) return;

    this.enviando.set(true); // Bloqueamos el botón

    // 2. Extraemos valores para el cálculo
    const recetaActual = this.receta();
    const votoUsuario = this.puntuacionSeleccionada();
    const votosActuales = recetaActual.votos || 0;
    const mediaActual = recetaActual.rating || 0;

    // 3. Cálculo matemático de la media ponderada
    const nuevosVotosTotal = votosActuales + 1;
    const nuevaMedia = ((mediaActual * votosActuales) + votoUsuario) / nuevosVotosTotal;

    // 4. Preparamos el objeto parcial para enviar (Partial<Receta>)
    const datosActualizados = {
      rating: nuevaMedia,
      votos: nuevosVotosTotal
    };

    // 5. Llamada a la API
    this.recetasService.actualizarReceta(recetaActual.id.toString(), datosActualizados).subscribe({
      next: (recetaRespuesta) => {
        console.log('✅ Voto registrado con éxito');
        
        // Refrescamos la signal global para que la UI se actualice sola
        this.recetasService.actualizarSignalReceta(recetaRespuesta);
        
        this.enviando.set(false);
        this.close.emit(); // Cerramos el modal
      },
      error: (e) => {
        console.error('❌ Error al votar:', e);
        this.enviando.set(false);
      }
    });
  }

  cancelar() {
    this.close.emit();
  }
}