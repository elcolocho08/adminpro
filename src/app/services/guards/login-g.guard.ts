import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGGuard implements CanActivate {

  constructor( public uS: UsuarioService,
               public router: Router ) {

  }

  canActivate() {

    if ( this.uS.estaLogeado() ) {
      console.log('Paso el Guard');
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
