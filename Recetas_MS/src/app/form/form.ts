import { Component, inject, output, Output } from '@angular/core';
import { Receta } from '../models/recetaModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecetasService } from '../services/recetas';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  
 // 1. Inyectamos el servicio
  private recetasService = inject(RecetasService);

  // 2. Output solo para avisar de cerrar (no enviamos datos, el servicio se encarga)
  cancel = output<void>();

  // 3. Variables del formulario (EN ESPAÑOL, como tu modelo)
  nombre = '';
  imagen = '';
  nuevoIngrediente = '';
  ingredientes: string[] = [];

  // --- LÓGICA DE INGREDIENTES ---
  addIngrediente() {
    if (this.nuevoIngrediente.trim()) {
      this.ingredientes.push(this.nuevoIngrediente.trim());
      this.nuevoIngrediente = '';
    }
  }

  removeIngrediente(index: number) {
    this.ingredientes.splice(index, 1);
  }

  // --- GUARDAR ---
  guardar() {
    // Validar
    if (!this.nombre.trim()) return;

    const nueva: Receta = {
      id: Date.now(),
      nombre: this.nombre,
      ingredientes: [...this.ingredientes],
      imagen: this.imagen,
      rating:0,
      votos:0
    
    };

    // Guardamos en el almacén central
    this.recetasService.agregarReceta(nueva);

    // Limpiamos
    this.nombre = '';
    this.imagen = '';
    this.ingredientes = [];

    // Avisamos al padre (Navbar) para que cierre la ventana
    this.cancel.emit();
  }

  cancelar() {
    this.cancel.emit();
  }
}
