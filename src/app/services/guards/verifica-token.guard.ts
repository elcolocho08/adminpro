import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor( public uS: UsuarioService ) {}

  canActivate(): Promise<boolean> | boolean {

    console.log('Token guard');


    let token = this.uS.token;
    let payload = JSON.parse( atob( token.split('.')[1] ) );

    let expirado = this.expirado( payload.exp );

    if ( expirado ) {
      this.uS.logout();
      return false;
    }


    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva( fechaExp: number ): Promise<boolean> {

    return new Promise( (resolve, reject)  => {

      let tokenExp = new Date( fechaExp * 1000 );
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + (1 * 60 * 60 * 1000) );

      if ( tokenExp.getTime() > ahora.getTime() ) {
        resolve(true);
      } else {
        this.uS.renuevaToken()
            .subscribe( () => {
              resolve(true);
            }, () => {
              reject(false);
              this.uS.logout();
            });
      }

      resolve(true);
    });



  }

  expirado( fechaExp: number ) {

    let ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      return true;
    } else {
      return false;
    }

  }

}
