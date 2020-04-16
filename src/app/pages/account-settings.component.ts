import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public settingService: SettingsService ) {}

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string,  link: any) {

    this.aplicarCheck(link);

    this.settingService.aplicarTema( tema );

  }

  aplicarCheck( link: any ) {
    const selectors: any = document.getElementsByClassName('selector');
    for (const ref of selectors) {
      ref.classList.remove('working');
        }
    link.classList.add('working');
    }

    colocarCheck() {

      const selectors: any = document.getElementsByClassName('selector');
      const tema = this.settingService.ajustes.tema;

      for (const ref of selectors) {
        if ( ref.getAttribute('data-theme') === tema ) {
            ref.classList.add('working');
            break;
        }
      }
    }
}
