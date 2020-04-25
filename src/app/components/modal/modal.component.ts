import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subirarchivo/subir-archivo.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor( public sB: SubirArchivoService,
               public mS: ModalService ) { }

  ngOnInit(): void {
  }

  subirImagen() {

    this.sB.subirArchivo( this.imagenSubir, this.mS.tipo, this.mS.id )
           .then( resp => {

            this.mS.notificacion.emit(resp);
            this.cerrarModal();

           })
            .catch( err => {

            });

  }

  cerrarModal() {

    this.imagenSubir = null;
    this.imagenTemp = null;

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
