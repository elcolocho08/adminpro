import { Component, OnInit } from '@angular/core';
import { SidevarService } from 'src/app/services/service.index';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styles: []
})
export class SidevarComponent implements OnInit {

  constructor( public sidebarS: SidevarService,
               public uS: UsuarioService ) { }

  ngOnInit(): void {
  }

}
