import { Component } from '@angular/core';
import { Gif } from '../interfaces/gifs.interface';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  constructor(private gifService: GifsService) {}

  get resultados(): Gif[]{
    return this.gifService.resultados;
  }

}
