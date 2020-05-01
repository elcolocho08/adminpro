import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  token: string = this.uS.token;
  hospital: Hospital;
  contador: number;

  constructor( public http: HttpClient,
               public uS: UsuarioService ) {
    this.cargarStorage();
   }

   guardarStorage( id: string, token: string, hospital: Hospital ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(hospital));

    this.hospital = hospital;
    this.token = token;
   }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  cargarHospitales() {

    let url = URL_SERVICIOS + '/hospital';

    return this.http.get(url)
               .pipe( map( (resp: any) => {
                  this.contador = resp.total;
                  return resp.hospitales;
     }));

  }

  obtenerHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url)
               .pipe( map( (resp: any) => resp.hospital ));

  }

  crearHospitales( nombre: string) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.uS.token;

    return this.http.post(url, { nombre })
                    .pipe( map( (resp: any) => resp.hospital
                    ));

  }

  buscarHospital(termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
              .pipe( map( (resp: any) => resp.hospitales));

  }

  actualizarService( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;

    return this.http.put( url, hospital )
                    .pipe( map( (resp: any ) => resp.hospital));
  }

 borrarHospital( id: string ) {

      let url = URL_SERVICIOS + '/hospital/' + id;
      url += '?token=' + this.uS.token;

      return this.http.delete(url)
                 .pipe( map (resp => resp));
    }

}
