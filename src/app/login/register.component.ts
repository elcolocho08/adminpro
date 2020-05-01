import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugin();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( public uS: UsuarioService,
               public router: Router ) { }

  sonIguales( campo1: string, campo2: string ) {

    return( group: FormGroup ) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      } else {
        return { sonIguales: true };
      }
    };

  }

  ngOnInit(): void {

    init_plugin();

    this.forma = new FormGroup({

    nombre: new FormControl( null, Validators.required ),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    password2: new FormControl(null, Validators.required),
    condiciones: new FormControl( false )

  }, {validators: this.sonIguales('password', 'password2') });

  }

  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      Swal.fire({title: 'Error',
      text: 'Debe aceptar los terminos y condiciones',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this.uS.crearUsuario( usuario )
           .subscribe( resp => this.router.navigate(['/login']),
              err => { Swal.fire({ title: 'Error', text: 'El correo ya esta registrado', icon: 'error'
            });
          });
  }

}
