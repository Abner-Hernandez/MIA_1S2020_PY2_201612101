import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly URL_API = "http://localhost:3000/api/user";

  constructor(private http: HttpClient) { 
    
  }

  get(){
    return this.http.get(this.URL_API);
  }

  getidusuario(mail: User){
    return this.http.post(this.URL_API+'/id', mail);
  }

  post(user: User){
    return this.http.post(this.URL_API,user);
  }

  getById(user: User){
    return this.http.post(this.URL_API+'/get',user);
  }

  getByMail(user: User){
    return this.http.post(this.URL_API+'/id',user);
  }

  update(user: User){
    return this.http.post(this.URL_API+'/update',user);
  }

  drop(user: User){
    return this.http.post(this.URL_API+'/delete',user);
  }

  putFoto(user: User){
    return this.http.post(this.URL_API+'/updateFoto',user);
  }

  verificar(us: number) {
    return this.http.get(this.URL_API+'/verificar/'+us);
  }

  reenviar(us: User){
    return this.http.post(this.URL_API+'/reenviar',us);
  }

  sync(us:User){
    return this.http.post(this.URL_API+'/sync',us);
  }
}
