import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  readonly URL_API = "http://192.168.43.45:3000/api/reportes";
  
  constructor(private http: HttpClient) { }

  getXYear(year: number){
    return this.http.post(this.URL_API+'/xYear',{ YEAR: year.toString()});
  }

  getBitacora(){
    return this.http.get(this.URL_API+'/bitacora');
  }

  getXEstructura(fecha: string){
    return this.http.post(this.URL_API+'/xEstructuras',{ DATE: fecha });
  }

  getXFolder(fmin: string, fmax: string, nombre: string){
    return this.http.post(this.URL_API+'/xFolder',{ NOMBRE: nombre, FMIN: fmin, FMAX: fmax });
  }

  getTree(){
    return this.http.get(this.URL_API+'/tree');
  }


}
