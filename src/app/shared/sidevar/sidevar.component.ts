import { Component, OnInit, SimpleChanges } from '@angular/core';
import { SidevarService } from 'src/app/services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styles: []
})
export class SidevarComponent implements OnInit {
  archivo: File;

  constructor( public sidebarS: SidevarService,
               public uS: UsuarioService ) {}

  ngOnInit(): void {
    this.uS.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.sidebarS.cargarMenu();
  }

}
