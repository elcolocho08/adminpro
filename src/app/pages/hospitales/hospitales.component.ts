import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../services/hospitales/hospitales.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalService } from '../../components/modal/modal.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

 hospitales: Hospital[] = [];

  constructor( public hS: HospitalesService,
               private mS: ModalService ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.mS.notificacion.subscribe( resp => this.cargarHospitales());
  }

  cargarHospitales() {

    this.hS.cargarHospitales()
           .subscribe( (resp: any) => {
             this.hospitales = resp;
           });

  }

  crearHospital( ) {

            Swal.fire({
            title: 'Enter the Hospital',
            input: 'text',
            inputPlaceholder: 'Enter the Hospital name',
            showCancelButton: true
          }).then( (result) => {
              if (!result.value || result.value === 0) {
                return;
              }

              this.hS.crearHospitales( result.value )
                     .subscribe( () => {
                       this.cargarHospitales();
                      });
          });
  }

  buscarHospitales( termino: string ) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.hS.buscarHospital( termino )
    .subscribe( (hospital: Hospital[]) => {

      this.hospitales = hospital;

    });

  }

  mostrarModal( id: string) {

    this.mS.mostrarModal( 'hospitales', id );

  }

  guardarHospital(hospital: Hospital ) {

    this.hS.actualizarService( hospital )
        .subscribe( resp => {
          Swal.fire({
            title: 'Actualizado',
            text: 'El hospital ha sido actualizado',
            icon: 'info',
            timer: 1300,
            showConfirmButton: false,
            allowOutsideClick: false
          });
          Swal.showLoading();
        });
  }

  borrarHospital( id: string ) {

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Estas seguro de borrar este Hospital',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.value) {

        this.hS.borrarHospital( id )
            .subscribe( resp => {
              Swal.fire({
                title: 'Borrado',
                text: 'El Hospital ha sido borrado',
                icon: 'success',
                timer: 1300,
                showConfirmButton: false,
                allowOutsideClick: false
              }),
              Swal.showLoading();
              this.cargarHospitales();
            });
          }
          });
        }
}
