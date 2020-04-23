import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { format } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  readonly URL_API = 'http://localhost:3000/api/archivo';

  constructor(private http: HttpClient) { }

  subir(name: string, file: File){
    const f = new FormData();
    f.append('filename',name);
    f.append('file',file,'form-data');
    return this.http.post(this.URL_API+'/subir',f);
  }
}
