import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  
  get_all_prod_by_categoria(idProducto: number){
    return this.http.post(this.URL_API+'/productsbycategory', {CATEGORY_ID: idProducto});
  } 

  product_search(patron: string){
    return this.http.post(this.URL_API+'/productsearch', {PATRON: patron});
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

  insertar_carrito(id_usuario: number, id_producto: number, cantidad: number, precio: number){
    return this.http.post(this.URL_API+"/icart",{USUARIO: id_usuario, PRODUCTO: id_producto, CANTIDAD: cantidad, PRECIO: precio});
  }

  insertar_factura_product(id_usuario: number, id_producto: number, cantidad: number, precio: number){
    return this.http.post(this.URL_API+"/invoice_product",{USUARIO: id_usuario, PRODUCTO: id_producto, CANTIDAD: cantidad, PRECIO: precio});
  }

  insertar_factura(id_usuario: number){
    return this.http.post(this.URL_API+"/insertinvoice",{USUARIO: id_usuario});
  }

  update(producto: Producto){
    return this.http.post(this.URL_API+"/update",producto);
  }

  get_all_colors(){
    return this.http.get(this.URL_API+'/gcolor');
  }

  get_all_products(){
    return this.http.get(this.URL_API+'/gproducts');
  }

  get_products_cart(id_user: number){
    return this.http.post(this.URL_API+'/products_cart', {ID_USUARIO: id_user});
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

  eliminar_producto_cart(user: number, producto: number, cantidad: number, precio: number){
    return this.http.post(this.URL_API+'/productocart', {USUARIO: user, PRODUCTO: producto, CANTIDAD: cantidad, PRECIO: precio});
  }

  insertar_producto_color(color: Color){
    return this.http.post(this.URL_API+'/productocolori', color);
  }

  eliminar_producto_color(color: Color){
    return this.http.post(this.URL_API+'/productocolore', color);
  }

  carga_masiva(user: number){
    return this.http.post(this.URL_API+'/carga_masiva', {USUARIO_ID: user});
  }

  carga_masivad(){
    return this.http.get(this.URL_API+'/delete_aux');
  }
}
