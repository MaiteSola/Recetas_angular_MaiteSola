import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from "../card/card";
import { RecetasService } from '../services/recetas'; // Tu servicio

@Component({
  selector: 'app-cards-content',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './cards-content.html',
  styleUrl: './cards-content.scss',
})
export class CardsContent {
  // 1. INYECCIÓN DE SERVICIO
  private recetasService = inject(RecetasService);

  // 2. DATOS (SIGNAL)
  // Obtenemos la señal del servicio. Al ser una Signal, la vista se actualiza sola
  // cuando el servicio cambie los datos.
  listaRecetas = this.recetasService.recetasFiltradas;

  // 3. LÓGICA DE BORRADO
  // Este método lo llama el HTML cuando la Card emite el evento 'eliminarReceta'
  // CAMBIO CLAVE: Recibimos string
borrarDesdePadre(idReceta: string) { 
  this.recetasService.borrarReceta(idReceta); 
}
}