import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalService } from '../../components/modal/modal.service';
import { SidevarService } from '../../services/shared/sidevar.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuario: Usuario[] = [];
  desde: number = 0;

  totalRegistrios: number = 0;
  cargando: boolean = true;

  constructor( public uS: UsuarioService,
               public mS: ModalService,
               public sidebarS: SidevarService) { }

  ngOnInit(): void {
    this.cargrUsuarios();
    this.mS.notificacion.subscribe( resp => this.cargrUsuarios());
  }

  mostrarModal( id: string ) {

      this.mS.mostrarModal( 'usuarios', id );

  }

  cargrUsuarios() {

    this.cargando = true;

    this.uS.cargarUsuarios( this.desde )
           .subscribe((resp: any) => {
             this.totalRegistrios = resp.total;
             this.usuario = resp.usuarios;
           });
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistrios) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargrUsuarios();
  }

  buscarUsuario( termino: string ) {

    if (termino.length <= 0) {
      this.cargrUsuarios();
      return;
    }

    this.uS.buscarUsuario( termino )
    .subscribe( (usuario: Usuario[]) => {

      this.usuario = usuario;

    });

  }

  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this.uS.usuario._id ) {
      Swal.fire({
        title: 'Error',
        text: 'No puede borrar su propio usuario',
        icon: 'error',
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 1500
      });
      Swal.showLoading();
      return;
    }

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Estas seguro de borrar este usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, !Borralo¡'
    }).then((result) => {
      if (result.value) {

        this.uS.borrarUsuario(usuario._id)
            .subscribe( resp => {
              Swal.fire(
                'Borrado',
                'El usuario ha sido borrado',
                'success'
              ),
              this.cargrUsuarios();
            });
      }
    });

  }

  guardarUsuario( usuario: Usuario ) {

    this.uS.actualizarService( usuario )
        .subscribe( resp => {

          if ( usuario.role === 'USER_ROLE' && usuario._id === this.uS.usuario._id) {
            this.uS.logout();
            Swal.fire({
              title: 'Administrador',
              text: 'Ha perdido todos los privilegios de administrador'
            });
          }

        });

  }

}
