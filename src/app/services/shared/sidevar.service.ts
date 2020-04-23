import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidevarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Progress Bar', url: '/progress' },
        { titulo: 'Graficas', url: '/graficas1' }
      ]
    }
  ];

  constructor() { }
}
