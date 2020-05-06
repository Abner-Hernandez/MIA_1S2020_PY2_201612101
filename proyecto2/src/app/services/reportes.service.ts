import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  readonly URL_API = "http://localhost:3000/api/reportes";
  
  constructor(private http: HttpClient) { }

  reporte2(year: number){
    return this.http.post(this.URL_API+'/reporte2',{YEAR: year});
  }

  reporte3(year: number){
    return this.http.post(this.URL_API+'/reporte3',{YEAR: year});
  }

  reporte4(){
    return this.http.get(this.URL_API+'/reporte4');
  }

  reporte6(){
    return this.http.get(this.URL_API+'/reporte6');
  }

  reporte7(){
    return this.http.get(this.URL_API+'/reporte7');
  }

  reporte10(disponibles: number){
    return this.http.post(this.URL_API+'/reporte10',{ DISPONIBLES: disponibles});
  }
  
  reporte11(){
    return this.http.get(this.URL_API+'/reporte11');
  }
  
}
