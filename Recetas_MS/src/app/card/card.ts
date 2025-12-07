import { Component, inject, Input, input, output} from '@angular/core';
import { Receta } from '../models/recetaModel';
import { RecetasService } from '../services/recetas';

@Component({
  selector: 'app-card',
  imports: [],
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
}
