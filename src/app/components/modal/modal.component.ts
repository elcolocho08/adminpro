import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subirarchivo/subir-archivo.service';
import { ModalService } from './modal.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;
  cambio: string;
  usuario: Usuario;
  file: string;

  constructor( public sB: SubirArchivoService,
               public mS: ModalService,
               public uS: UsuarioService ) { }

  ngOnInit(): void {
  }

  subirImagen() {

    this.sB.subirArchivo( this.imagenSubir, this.mS.tipo, this.mS.id )
           .then( (resp: any) => {
            this.mS.notificacion.emit(resp);
            if ( this.mS.id === this.uS.usuario._id ) {
              this.uS.usuario.img = resp.usuario.img;
              localStorage.setItem('usuario', JSON.stringify(this.uS.usuario));
            }
            this.cerrarModal();

           })
            .catch( err => {
              console.log( err );
            });

  }

  cerrarModal() {

    this.imagenSubir = null;
    this.imagenTemp = null;
    this.file = '';

    this.mS.ocultarModal();
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

}
