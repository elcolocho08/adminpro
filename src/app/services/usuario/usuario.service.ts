import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  constructor( private http: HttpClient,
               public router: Router ) {
    this.cargarStorage();
  }

  estaLogeado() {

    return ( this.token.length > 5 ) ? true : false;

  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, {token} )
                    .pipe(map( (resp: any) => {

                      this.guardarStorage( resp.id, resp.token, resp.usuario );
                      return true;
                    }));

  }

  login( usuario: Usuario, recuerdame: boolean = false ) {

    if ( recuerdame ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = `${URL_SERVICIOS}/login`;
    return this.http.post(url, usuario)
                    .pipe( map( (resp: any) => {

                      this.guardarStorage( resp.id, resp.token, resp.usuario );

                      return true;
                    }));

  }

  logout() {

    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

  crearUsuario(usuario: Usuario) {

    let url = `${URL_SERVICIOS}/usuario`;

    return this.http.post( url, usuario )
               .pipe(map( (resp: any ) => {

                Swal.fire({
                 title: 'Usuario Creado',
                 text: 'El usuario ha sido creado correctamente',
                 icon: 'success',
                 showConfirmButton: false,
                 timer: 1300,
                 allowOutsideClick: false
                });
                Swal.showLoading();
                return resp.usuario;

               }));

  }

}
