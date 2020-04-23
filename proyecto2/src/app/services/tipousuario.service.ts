import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipousuario } from '../models/tipousuario';

@Injectable({
  providedIn: 'root'
})
export class TipousuarioService {

  readonly URL_API = "http://localhost:3000/api/tipouser";

  constructor(private http: HttpClient) { }

  getTipoUsuarios(){
    return this.http.get(this.URL_API);
  }

  postTipoUsuario(genero: Tipousuario){
    return this.http.post(this.URL_API+"/insert",genero);
  }

  deleteTipoUsuario(genero: Tipousuario){
    return this.http.post(this.URL_API+"/eliminar",genero);
  }

}
