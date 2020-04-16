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
        { titulo: 'dashboard', url: '/dashboard' },
        { titulo: 'progressBar', url: '/progress' },
        { titulo: 'graficas', url: '/graficas1' }
      ]
    }
  ];

  constructor() { }
}
