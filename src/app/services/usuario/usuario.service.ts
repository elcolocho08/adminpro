import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirarchivo/subir-archivo.service';

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
               public router: Router,
               public sAS: SubirArchivoService ) {
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

  actualizarService( usuario: Usuario ) {

  let url = URL_SERVICIOS + '/usuario/' + usuario._id;
  url += '?token=' + this.token;

  return this.http.put( url, usuario )
                  .pipe( map( (resp: any ) => {

                    if ( usuario._id === this.usuario._id ) {

                      let usuarioDB: Usuario = resp.usuario;
                      this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
                    }

                    Swal.fire({
                      title: 'Usuario Actualzado',
                      text: 'El usuario ha sido actualizado correctamente',
                      icon: 'success',
                      timer: 1300,
                      showConfirmButton: false,
                      allowOutsideClick: false
                    });
                    Swal.showLoading();

                    return true;

                  }));

  }

  cambiarImagen( archivo: File, id: string ) {

     this.sAS.subirArchivo( archivo, 'usuarios', id )
             .then( (resp: any ) => {
              this.usuario.img = resp.usuario.img;

              Swal.fire({
                title: 'Imagen Actualzado',
                      text: 'La imagen ha sido actualizado correctamente',
                      icon: 'success',
                      timer: 1300,
                      showConfirmButton: false,
                      allowOutsideClick: false
              });
              Swal.showLoading();

              this.guardarStorage(id, this.token, this.usuario);
             })
             .catch( resp => {
              console.log(resp);
             });
  }

  cargarUsuarios(desde: number = 0) {

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);

  }

  buscarUsuario( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url)
              .pipe( map( (resp: any) => resp.usuarios));

  }

  borrarUsuario( id: string ) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url);

  }

}
