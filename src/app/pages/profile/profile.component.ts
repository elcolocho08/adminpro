import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor( public uS: UsuarioService ) {
    this.usuario = this.uS.usuario;
  }

  ngOnInit(): void {
  }

  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this.uS.actualizarService( this.usuario )
           .subscribe( resp => err => {
            Swal.fire({
              title: 'Error',
              text: err.error.mensaje,
              icon: 'error'
             });
         });

  }

  seleccionImagen( archivo: File ) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      Swal.fire({
        title: 'Solo imagenes',
        text: 'Solo se aceptan imagenes',
        icon: 'error',
        allowOutsideClick: false
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {
    this.uS.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
