import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  get historial(): string[]{
    return this.gifsService.historial.splice(0,10);
  }

  BuscarGif(item: string){
    this.gifsService.obtenerGifs(item);
  }

  EliminarBusqueda(index: number){
    this.gifsService.EliminarBusqueda(index);
  }
}
