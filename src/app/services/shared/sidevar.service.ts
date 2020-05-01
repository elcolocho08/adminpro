import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidevarService {

  menu: any[] = [];

  constructor( public uS: UsuarioService ) {}

  cargarMenu() {
    this.menu = this.uS.menu;
  }
}
