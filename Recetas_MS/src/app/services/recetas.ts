import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta } from '../models/recetaModel';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  
  private http = inject(HttpClient);
  // URL de tu MockAPI (Base de datos en la nube)
  private apiUrl = 'https://69303d7e778bbf9e00708054.mockapi.io/recetas/listaRecetas';

  // ==========================================
  // 1. ESTADO (Signals)
  // ==========================================
  
  // Lista maestra de recetas (Privada para controlar quién la modifica)
  private _recetas = signal<Receta[]>([]);

  // Filtros activos
  searchTerm = signal(''); // Texto del buscador
  minRating = signal(0);   // Filtro de estrellas (0 = ver todas)

  // ==========================================
  // 2. SELECTORES (Computed)
  // ==========================================

  // Esta señal se recalcula AUTOMÁTICAMENTE si cambia _recetas, searchTerm o minRating.
  // Es el corazón de la reactividad de tu app.
  recetasFiltradas = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const ratingFilter = this.minRating();
    const lista = this._recetas();

    return lista.filter(r => {
      const coincideNombre = r.nombre.toLowerCase().includes(term);
      const coincideRating = (r.rating || 0) >= ratingFilter;
      return coincideNombre && coincideRating;
    });
  });

  constructor(){
    this.obtenerRecetas(); // Carga inicial
  }

  // ==========================================
  // 3. ACCIONES (HTTP + Actualización de Estado)
  // ==========================================

  // GET: Cargar datos iniciales
  obtenerRecetas() {
    this.http.get<Receta[]>(this.apiUrl).subscribe({
      next: (datos) => {
        console.log('✅ Recetas cargadas:', datos);
        this._recetas.set(datos);
      },
      error: (err) => console.error('❌ Error al cargar:', err)
    });
  }

  // POST: Crear receta nueva
  agregarReceta(receta: Receta) {
    this.http.post<Receta>(this.apiUrl, receta).subscribe({
      next: (recetaGuardada) => {
        console.log('✅ Receta creada:', recetaGuardada);
        // Actualizamos la lista local añadiendo la nueva (Spread operator)
        this._recetas.update(lista => [...lista, recetaGuardada]);
      },
      error: (err) => console.error('❌ Error al guardar:', err)
    });
  }

  // DELETE: Borrar receta
  borrarReceta(id: string) {
    const url = `${this.apiUrl}/${id}`;
    this.http.delete(url).subscribe({
      next: () => {
        console.log(`🗑️ Receta ${id} borrada`);
        // Actualizamos la lista local filtrando la que acabamos de borrar
        this._recetas.update(lista => lista.filter(r => r.id != id));
      },
      error: (err) => console.error('❌ Error al borrar:', err)
    });
  }

  // PUT: Actualizar receta (usado para votar)
  // Devuelve un Observable para que el componente (VoteModal) sepa cuándo terminar
  actualizarReceta(id: string, datosActualizados: Partial<Receta>): Observable<Receta> {
    return this.http.put<Receta>(`${this.apiUrl}/${id}`, datosActualizados);
  }

  // MÉTODO CLAVE: Refrescar una receta específica en la lista local sin recargar todo
  actualizarSignalReceta(recetaActualizada: Receta) {
    this._recetas.update(lista => 
      lista.map(r => r.id === recetaActualizada.id ? recetaActualizada : r)
    );
  }

  // --- MÉTODOS DE UI ---

  buscar(texto: string) {
    this.searchTerm.set(texto);
  }

  filtrarPorEstrellas(estrellas: number) {
    this.minRating.set(estrellas);
  }
}