import { Component, OnInit } from '@angular/core';
import { SidevarService } from 'src/app/services/service.index';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styles: []
})
export class SidevarComponent implements OnInit {

  usuario: Usuario;

  constructor( public sidebarS: SidevarService,
               public uS: UsuarioService ) { }

  ngOnInit(): void {
    this.usuario = this.uS.usuario;
  }

}
