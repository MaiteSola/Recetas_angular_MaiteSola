export interface Receta {
  id: number;
  nombre: string;
  ingredientes: string[];
  imagen?: string;
  rating:number;
  votos:number;
  createdAt?: string;

}