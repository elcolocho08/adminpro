import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public tipo: string;
  public id: string;

  public oculto: string = 'cerrar';

  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal() {

    this.oculto = 'cerrar';
    this.id = null;
    this.tipo = null;

  }

  mostrarModal( tipo: string, id: string ) {

    this.oculto = '';
    this.id = id;
    this.tipo = tipo;

  }

}
