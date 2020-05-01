import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  contador: number;

  constructor( public http: HttpClient,
               public uS: UsuarioService ) { }

  cargarService() {

    const url = URL_SERVICIOS + '/medico';

    return this.http.get(url)
               .pipe( map( (resp: any) => {
                  this.contador = resp.total;
                  return resp.medicos;
               }));

  }

  crearService( nombre: string ) {

    let url = URL_SERVICIOS + '/medico';
    url += '?token=' + this.uS.token;

    return this.http.post(url, { nombre })
                    .pipe( map( (resp: any) => resp.medicos
                    ));

  }

  borrarService(id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.uS.token;

    return this.http.delete(url);

  }

  buscarService( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
              .pipe( map( (resp: any) => resp.medicos));

  }

  guardarService( medico: Medico ) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {

      url += '/' + medico._id;
      url += '?token=' + this.uS.token;

      return this.http.put(url, medico)
                 .pipe( map((resp: any ) => {

                  Swal.fire({
                    title: 'Actualizado',
                    text: 'El medico ha sido actualizado',
                    icon: 'success',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 1300,
                  });
                  Swal.showLoading();
                  return resp.medico;
                 }));

    } else {

      url += '?token=' + this.uS.token;

      return this.http.post( url, medico )
             .pipe( map( (resp: any) => {

              Swal.fire({
                title: 'Creado',
                text: 'El medico ha sido creado',
                icon: 'success',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 1300,
              });
              Swal.showLoading();
              return resp.medico;

             }));

    }
  }

  cargarMedicoService( id: string ) {

    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
               .pipe( map ((resp: any) => resp.medico));

  }


}


