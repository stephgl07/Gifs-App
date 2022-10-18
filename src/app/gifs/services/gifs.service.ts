import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = '61hvyk8iF4vc2n2sHR6Fq8wWnZ1dGVv5';
  private giphyBaseUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this.cargarDefaultGifs();
  }

  buscarGifs(query: string): void {
    this._historial.unshift(query);
    this.refrescarLocalStorage(this._historial);
    this.obtenerGifs(query);
  }

  obtenerGifs(query: string): void {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', 10);
    this.http
      .get<SearchGifResponse>(`${this.giphyBaseUrl}/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;
        console.log(resp.data);
      });
  }

  cargarHistorial(): string[] {
    const strHistorialPrevio = localStorage.getItem('historial') ?? '[]';
    return JSON.parse(strHistorialPrevio);
  }

  cargarDefaultGifs(): void {
    this._historial = this.cargarHistorial();
    if (this.historial.length > 0) {
      this.obtenerGifs(this.historial[0]);
    }
  }

  EliminarBusqueda(index: number): void{
    if (index > -1) { // only splice array when item is found
      this._historial.splice(index, 1); // 2nd parameter means remove one item only
      this.refrescarLocalStorage(this._historial);
    }
  }

  refrescarLocalStorage(historial: string[]): void {
    localStorage.setItem('historial', JSON.stringify(historial));
  }
}
