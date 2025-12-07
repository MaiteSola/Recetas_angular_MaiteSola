import { Component, inject, output } from '@angular/core'; // Limpiado: quitado 'Output'
import { Receta } from '../models/recetaModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecetasService } from '../services/recetas';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  
  // 1. INYECCIÓN DE DEPENDENCIAS
  private recetasService = inject(RecetasService);

  // 2. COMUNICACIÓN (OUTPUT)
  // Avisamos al padre para cerrar (no enviamos datos, solo el evento)
  cancel = output<void>();

  // 3. MODELO DEL FORMULARIO
  // Variables vinculadas con [(ngModel)] en el HTML
  nombre = '';
  imagen = '';
  nuevoIngrediente = '';
  ingredientes: string[] = [];

  // --- LÓGICA DE INGREDIENTES ---

  // Añade un ingrediente a la lista local si no está vacío
  addIngrediente() {
    if (this.nuevoIngrediente.trim()) {
      this.ingredientes.push(this.nuevoIngrediente.trim());
      this.nuevoIngrediente = ''; // Limpiamos el input para seguir escribiendo
    }
  }

  // Borra un ingrediente por su índice
  removeIngrediente(index: number) {
    this.ingredientes.splice(index, 1);
  }

  // --- GUARDADO ---

  guardar() {
    // Validación simple: Si no hay nombre, no hacemos nada
    if (!this.nombre.trim()) return;

    // Creamos el objeto receta
    // Nota: Convertimos id a string para asegurar compatibilidad con la API
    const nueva: Receta = {
      id: Date.now().toString(),
      nombre: this.nombre,
      ingredientes: [...this.ingredientes], // Copia del array
      imagen: this.imagen,
      rating: 0, // Inicializamos a 0 estrellas
      votos: 0   // Inicializamos a 0 votos
    };

    // Enviamos al servicio
    this.recetasService.agregarReceta(nueva);

    // Limpiamos el formulario (Reset)
    this.nombre = '';
    this.imagen = '';
    this.ingredientes = [];

    // Cerramos el modal
    this.cancel.emit();
  }

  cancelar() {
    this.cancel.emit();
  }
}