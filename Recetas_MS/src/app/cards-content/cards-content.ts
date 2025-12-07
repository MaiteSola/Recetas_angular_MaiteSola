import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Card } from "../card/card";
import { RecetasService } from '../services/recetas';



@Component({
  selector: 'app-cards-content',
  imports: [CommonModule, Card],
  templateUrl: './cards-content.html',
  styleUrl: './cards-content.scss',
})
export class CardsContent {
  private recetasService = inject(RecetasService);

  // CONECTAMOS A LA LISTA FILTRADA
  listaRecetas = this.recetasService.recetasFiltradas;

  // 3. Gestionamos el borrado llamando al servicio
  onDelete(id: number) {
    this.recetasService.borrarReceta(id);
  }

}
