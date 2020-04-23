import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  readonly URL_API = 'http://localhost:3000/api/correo';

  constructor(private http: HttpClient) { }

  enviarVerificar(email: Email){
    return this.http.post(this.URL_API+'/email',email);
  }
}
