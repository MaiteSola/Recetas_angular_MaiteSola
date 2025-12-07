export interface Receta {
  id: string;
  nombre: string;
  ingredientes: string[];
  imagen?: string;
  rating:number;
  votos:number;
  createdAt?: string;

}