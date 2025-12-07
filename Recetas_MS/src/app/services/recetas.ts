import { Injectable, signal,computed, inject } from '@angular/core';
import { Receta } from '../models/recetaModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  
private http = inject(HttpClient);

private apiUrl = 'https://69303d7e778bbf9e00708054.mockapi.io/recetas/listaRecetas';


// 1. Estado privado: Aquí guardamos los datos reales
  // Inicializamos con tus datos de prueba para que no salga vacío al principio
  private _recetas = signal<Receta[]>([]);

  // Aquí guardaremos lo que escribas en el buscador del Navbar
  searchTerm = signal('');


  // 3. SELECTOR (Computed): La lista filtrada
  // Esta variable se recalcula SOLA si cambia _recetas O cambia searchTerm
  recetasFiltradas = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const lista = this._recetas();

    // Si no hay búsqueda, devuelve todo. Si hay, filtra.
    if (!term) return lista;
    return lista.filter(r => r.nombre.toLowerCase().includes(term));
  });


  constructor(){

    this.obtenerRecetas();
  }
  obtenerRecetas() {
    this.http.get<Receta[]>(this.apiUrl).subscribe({
      next: (datos) => {
        console.log('Recetas cargadas:', datos);
        this._recetas.set(datos); // Actualizamos la signal con los datos reales
      },
      error: (err) => console.error('Error al descargar recetas:', err)
    });
  }

 // POST: Enviar una nueva receta
  agregarReceta(receta: Receta) {
    // Nota: Aunque le mandes un ID temporal, MockAPI generará uno nuevo y el createdAt automáticamente.
    this.http.post<Receta>(this.apiUrl, receta).subscribe({
      next: (recetaGuardada) => {
        console.log('Receta creada en la nube:', recetaGuardada);
        // recetaGuardada ya viene con ID real y createdAt. La metemos en la lista local.
        this._recetas.update(lista => [...lista, recetaGuardada]);
      },
      error: (err) => console.error('Error al guardar:', err)
    });
  }

  // DELETE: Borrar receta por ID
  borrarReceta(id: number | string) { // Aceptamos string o number por seguridad
    const url = `${this.apiUrl}/${id}`;
    
    this.http.delete(url).subscribe({
      next: () => {
        console.log(`Receta ${id} borrada`);
        // Actualizamos la lista local quitando el elemento borrado
        // Usamos doble igual (==) para que funcione aunque uno sea texto y otro número
        this._recetas.update(lista => lista.filter(r => r.id != id));
      },
      error: (err) => console.error('Error al borrar:', err)
    });
  }

  // Método para actualizar la búsqueda (lo llamará el Navbar)
  buscar(texto: string) {
    this.searchTerm.set(texto);
  }

}
