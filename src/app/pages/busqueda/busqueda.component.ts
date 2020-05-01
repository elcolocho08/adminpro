import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: any[] = [];
  hospitales: any[] = [];
  medicos: any[] = [];

  constructor(public activeRoute: ActivatedRoute,
              public http: HttpClient) {

    activeRoute.params
        .subscribe( params => {
          let termino = params['termino'];
          this.buscar(termino);
        });

  }

  ngOnInit(): void {
  }

  buscar( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get(url)
        .subscribe((resp: any) => {

          this.usuarios = resp.usuarios;
          this.hospitales = resp.hospitales;
          this.medicos = resp.medicos;
          console.log(resp);

        });

  }

}
