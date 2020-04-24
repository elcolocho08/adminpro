import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SettingsService,
  SharedService,
  SidevarService,
  UsuarioService,
  LoginGGuard,
  SubirArchivoService
} from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidevarService,
    UsuarioService,
    SubirArchivoService,
    LoginGGuard
  ]
})
export class ServiceModule { }
