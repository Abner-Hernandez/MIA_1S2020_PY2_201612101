import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bitacora } from '../models/bitacora';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  readonly URL_API = 'http://localhost:3000/api/bitacora';

  constructor(private http: HttpClient) { }

  getBitacora(){
    return this.http.get(this.URL_API);
  }

  insertarBitacora(b: Bitacora){
    return this.http.post(this.URL_API+'/insertar',b);
  }

}
