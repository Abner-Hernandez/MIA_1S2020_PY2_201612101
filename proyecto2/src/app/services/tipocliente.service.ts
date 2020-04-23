import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipocliente } from '../models/tipocliente';

@Injectable({
  providedIn: 'root'
})
export class TipoclienteService {

  readonly URL_API = "http://localhost:3000/api/tipocliente";

  constructor(private http: HttpClient) { }

  getTipoCliente(){
    return this.http.get(this.URL_API);
  }

  postTipoCliente(genero: Tipocliente){
    return this.http.post(this.URL_API+"/insert",genero);
  }

  deleteTipoCliente(genero: Tipocliente){
    return this.http.post(this.URL_API+"/eliminar",genero);
  }

}
