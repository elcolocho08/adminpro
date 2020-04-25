import { Component, OnInit } from '@angular/core';

declare function init_plugin();

@Component({
  selector: 'app-pagenofound',
  templateUrl: './pagenofound.component.html',
  styles: []
})
export class PagenofoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugin();
  }

}
