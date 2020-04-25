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
import { ModalService } from '../components/modal/modal.service';

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
    LoginGGuard,
    ModalService
  ]
})
export class ServiceModule { }
