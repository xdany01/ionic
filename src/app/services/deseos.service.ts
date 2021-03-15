import {Injectable} from '@angular/core';
import {ListaModel} from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: ListaModel[];

  constructor() {
    this.listas = [];
    this.cargarStorage();
  }

  crearLista(titulo: string) {
    const nuevaLista = new ListaModel(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  borrarLista(lista: ListaModel) {
    this.listas = this.listas.filter(listaData => {
      return listaData.id !== lista.id;
    });
    this.guardarStorage();
  }

  obtenerLista(id: string | number) {
    id = Number(id);
    return this.listas.find(listaData => listaData.id === id);
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
  }
}
