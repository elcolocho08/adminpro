import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default'
  };

  guardarAjustes() {
    localStorage.setItem( 'ajustes', JSON.stringify( this.ajustes ) );
  }

  constructor( @Inject(DOCUMENT) private document ) {
    this.cargarAjustes();
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse( localStorage.getItem( 'ajustes' ) );
    } else {
      this.aplicarTema( this.ajustes.tema );
    }
    this.aplicarTema( this.ajustes.tema );
  }

  aplicarTema( tema: string ) {
    const url = `assets/css/colors/${ tema }.css`;
    this.document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
