import { Component, OnInit } from '@angular/core';
import { SidevarService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styles: []
})
export class SidevarComponent implements OnInit {

  constructor( public sidebarS: SidevarService ) { }

  ngOnInit(): void {
  }

}
