import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Estructura } from '../models/estructura';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class productService {

  readonly URL_API = 'http://localhost:3000/api/producto';

  constructor(private http: HttpClient) { }

  productosbyid(user: string){
    return this.http.post(this.URL_API+'/get', {ID_USUARIO: user});
  }

  eliminar(producto: Producto){
    return this.http.post(this.URL_API+"/eliminar",producto);
  }

  insertar(producto: Producto){
    return this.http.post(this.URL_API,producto);
  }

  update(producto: Producto){
    return this.http.post(this.URL_API+"/update",producto);
  }
}
