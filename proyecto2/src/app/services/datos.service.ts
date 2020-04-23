import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Datos } from '../models/datos';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  readonly URL_API = "http://localhost:3000/api/";

  constructor(private http: HttpClient) { }

  getInformation(){
    return this.http.get(this.URL_API+'datos');
  }

  postInformation(info: Datos){
    return this.http.post(this.URL_API+'datos/cambiar',info);
  }

  putLogo(info: Datos){
    return this.http.post(this.URL_API+'datos/logo',info);
  }

  putVideo(info: Datos){
    return this.http.post(this.URL_API+'datos/video',info);
  }
}
