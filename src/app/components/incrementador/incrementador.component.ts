import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, asNativeElements } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() leyenda: string = 'leyenda';
  @Input() porcentaje: number;

  @Output() cambiovalor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onCambio( newValue: number ) {

    // const elemHTML: any = document.getElementsByName('porcentaje')[0];

    if ( newValue >= 100 ) {
      this.porcentaje = 100;
    } else if ( newValue <= 0 ) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

    // elemHTML.value = this.porcentaje;

    this.txtProgress.nativeElement.value = this.porcentaje;

    this.cambiovalor.emit( this.porcentaje );

  }

  incrementar(valor: number) {

    if ( this.porcentaje === 100 ) {
      alert('Has alcanzado el maximo');

    } else {
      this.porcentaje = this.porcentaje + valor;
      this.cambiovalor.emit( this.porcentaje );
    }


  }

  decrecer(valor: number) {
    if ( this.porcentaje === 0 ) {
      alert('Has alcanzado el minimo');

    } else {
      this.porcentaje = this.porcentaje + valor;
      this.cambiovalor.emit( this.porcentaje );
    }

  }

}
