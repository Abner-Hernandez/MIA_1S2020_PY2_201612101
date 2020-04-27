import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly URL_API = "http://localhost:3000/api/categoria";
  
  constructor(private http: HttpClient) { }

  categorias(){
    return this.http.get(this.URL_API);
  }

  categorias_padres(){
    return this.http.get(this.URL_API+"/padres");
  }

  posthijas(id){
    return this.http.post(this.URL_API+"/hijas",id);
  }

  get_all_hijas(id: number){
    return this.http.post(this.URL_API+"/gethijasbyid",{CATEGORY_ID: id});
  }

  get_data_by_id(categoria: Categoria){
    return this.http.post(this.URL_API+"/getbyid", categoria);
  }

  postCategoria(categoria: Categoria){
    return this.http.post(this.URL_API+"/insert",categoria);
  }

  deleteCategoria(categoria: Categoria){
    return this.http.post(this.URL_API+"/eliminar",categoria);
  }

  update(categoria: Categoria){
    return this.http.post(this.URL_API+'/update',categoria);
  }
}
