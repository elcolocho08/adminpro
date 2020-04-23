import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidevarService } from './service.index';
import { UsuarioService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { LoginGGuard } from './service.index';

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
    LoginGGuard
  ]
})
export class ServiceModule { }
