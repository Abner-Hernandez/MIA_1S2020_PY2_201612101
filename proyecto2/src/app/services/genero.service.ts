import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genero } from '../models/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  readonly URL_API = "http://localhost:3000/api/generos";
  
  constructor(private http: HttpClient) { }

  getGeneros(){
    return this.http.get(this.URL_API);
  }

  postGenero(genero: Genero){
    return this.http.post(this.URL_API+"/insert",genero);
  }

  deleteGenero(genero: Genero){
    return this.http.post(this.URL_API+"/eliminar",genero);
  }
}
