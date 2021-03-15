import {ListaItemModel} from './lista-item.model';

export class ListaModel {
  id: number;
  titulo: string;
  creadaEn: Date;
  terminadaEn: Date;
  terminada: boolean;
  items: ListaItemModel[];

  constructor(titulo: string) {
    this.titulo = titulo;
    this.creadaEn = new Date();
    this.terminada = false;
    this.items = [];
    this.id = new Date().getTime();
  }
}
