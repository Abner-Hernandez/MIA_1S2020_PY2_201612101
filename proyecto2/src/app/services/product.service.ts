import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Estructura } from '../models/estructura';
import { Producto } from '../models/producto';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class productService {

  readonly URL_API = 'http://localhost:3000/api/producto';

  constructor(private http: HttpClient) { }

  productosbyid(user: string){
    return this.http.post(this.URL_API+'/get', {ID_USUARIO: user});
  }

  get_producto_by_name(name: string){
    return this.http.post(this.URL_API+'/get_id', {PRODUCT_NAME: name});
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

  get_all_colors(){
    return this.http.get(this.URL_API+'/gcolor');
  }

  get_all_colors_by(idProducto: number){
    return this.http.post(this.URL_API+'/colorbyid', {PRODUCT_ID: idProducto});
  }

  insertar_color(color: string){
    return this.http.post(this.URL_API+'/icolor', {COLOR_NAME: color});
  }

  editar_color(color: Color){
    return this.http.post(this.URL_API+'/edcolor', color);
  }

  eliminar_color(color: Color){
    return this.http.post(this.URL_API+'/ecolor', color);
  }

  insertar_producto_color(color: Color){
    return this.http.post(this.URL_API+'/productocolori', color);
  }

  eliminar_producto_color(color: Color){
    return this.http.post(this.URL_API+'/productocolore', color);
  }
}
