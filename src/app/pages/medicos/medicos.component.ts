import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedicoService } from '../../services/medicos/medico.service';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';
import { ModalService } from '../../components/modal/modal.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: any[] = [];

  constructor( public http: HttpClient,
               public medicoS: MedicoService,
               public mS: ModalService ) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.mS.notificacion.subscribe( resp => this.cargarMedicos());
  }

  cargarMedicos() {

    this.medicoS.cargarService()
        .subscribe( (resp: any) => {
          this.medicos = resp;
        });

  }

  mostrarModal(id: string) {

    this.mS.mostrarModal( 'medicos', id );

  }

  borrarMedico(id: string) {

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Estas seguro de borrar el Medico',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.value) {

        this.medicoS.borrarService(id)
        .subscribe( resp => {
              Swal.fire({
                title: 'Borrado',
                text: 'El Medico ha sido borrado',
                icon: 'success',
                timer: 1300,
                showConfirmButton: false,
                allowOutsideClick: false
              }),
              Swal.showLoading();
              this.cargarMedicos();
            });
          }
          });
  }

  buscarHospitales( termino: string ) {

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.medicoS.buscarService( termino )
    .subscribe( (medico: Medico[]) => {

      this.medicos = medico;

    });

  }

}
