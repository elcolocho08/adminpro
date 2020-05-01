import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from '../../services/medicos/medico.service';
import { HospitalesService } from '../../services/hospitales/hospitales.service';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor( public medicoS: MedicoService,
               public hS: HospitalesService,
               public router: Router,
               public activeteRoute: ActivatedRoute ) {

                activeteRoute.params.subscribe( params => {

                    let id = params['id'];

                    if (id !== 'nuevo') {

                      this.cargarMedico(id);

                    }

                });
               }

  ngOnInit(): void {
    this.hS.cargarHospitales()
        .subscribe( resp => this.hospitales = resp );
  }

  guardarMedico( f: NgForm ) {

    if ( f.invalid ) {
      return;
    }

    this.medicoS.guardarService( this.medico )
        .subscribe( resp => {

          this.medico._id = resp._id;

          this.router.navigate(['medico', resp._id]);

        });

  }

  cambioHospital(id: string) {

    this.hS.obtenerHospital(id)
        .subscribe( resp => this.hospital = resp);

  }

  cargarMedico(id: string) {
    this.medicoS.cargarMedicoService(id)
        .subscribe( resp => {
          this.medico = resp;
          this.medico.hospital = resp.hospital._id;
          this.cambioHospital( this.medico.hospital );
        });
  }
}
