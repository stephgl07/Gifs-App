import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
  
  @ViewChild('txtBuscar') elemBuscar !: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  Buscar(){
    const entry = this.elemBuscar.nativeElement.value.trim().toLowerCase();
    this.elemBuscar.nativeElement.value = '';
    
    if(entry.length === 0){
      return;
    }

    if(this.gifsService.historial.includes(entry)){
      return;
    }
    
    this.gifsService.buscarGifs(entry);

  }

}
