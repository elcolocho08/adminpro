import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalService } from '../components/modal/modal.service';
import { MedicoService } from './medicos/medico.service';
import { SettingsService } from './settings/settings.service';
import { SharedService } from './shared/shared.service';
import { SidevarService } from './shared/sidevar.service';
import { UsuarioService } from './usuario/usuario.service';
import { SubirArchivoService } from './subirarchivo/subir-archivo.service';
import { LoginGGuard } from './guards/login-g.guard';
import { AdminGuard } from './guards/admin.guard';
import { HospitalesService } from './hospitales/hospitales.service';
import { VerificaTokenGuard } from './guards/verifica-token.guard';

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
    AdminGuard,
    VerificaTokenGuard,
    ModalService,
    HospitalesService,
    MedicoService
  ]
})
export class ServiceModule { }
