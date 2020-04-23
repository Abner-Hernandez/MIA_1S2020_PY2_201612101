import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ReportesService } from 'src/app/services/reportes.service';
import { User, UserBitacora } from 'src/app/models/user';
import { BitacoraUsuario, Bitacora } from 'src/app/models/bitacora';
import { formatDate } from '@angular/common';
import { EstructuraReporte, Estructura } from 'src/app/models/estructura';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { BitacoraService } from 'src/app/services/bitacora.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  datosXYear: User[] = [];
  displayedColumns: string[] = ['USERNAME', 'CORREO', 'NOMBRE', 'APELLIDO', 'FECHA'];
  panelEstado = false;
  sYear: number = 0;

  dataTree: EstructuraReporte[] = [];
  displayedColumnsTree: string[] = ['ID', 'NOMBRE', 'PROPIETARIO', 'TIPO', 'PADRE'];

  txtEstructura: string = "";
  fmin = new Date();
  fmax = new Date();
  dataEstructuras: BitacoraUsuario[] = [];
  dataEUsers: User[] = [];
  displayedColumnsClientess: string[] = ['NOMBRE', 'APELLIDO', 'USERNAME', 'TIPO'];

  datosBitacora: BitacoraUsuario[] = [];
  displayedColumnsbitacora: string[] = ['ID', 'USUARIO', 'ESTRUCTURA', 'ACCION', 'FECHA'];

  fecha = new Date();
  dataXDate: UserBitacora[] = [];
  displayedColumnsDate: string[] = ['USERNAME', 'CORREO', 'NOMBRE', 'APELLIDO', 'FECHA', 'ESTRUCTURAS'];


  constructor(private reporteService: ReportesService, private bitacoraService: BitacoraService) { }

  ngOnInit() {
    this.bitacoraService.getBitacora().subscribe(
      (datosByAPI: BitacoraUsuario[]) => {
        
        this.dataEstructuras = datosByAPI;
      }
    );
  }

  buscarPerYear() {
    this.reporteService.getXYear(this.sYear).subscribe(
      (datosByAPI: User[]) => {
        this.datosXYear = datosByAPI;
      }
    );
  }

  obtenerBitacora() {
    if (this.panelEstado)
      this.reporteService.getBitacora().subscribe(
        (datosByAPI: BitacoraUsuario[]) => {
          this.datosBitacora = datosByAPI;
        }
      );
  }

  //a: string ="";

  searchPerDate() {
    //this.a = formatDate(this.fecha,"dd/MM/yyyy","en-US");

    this.reporteService.getXEstructura(formatDate(this.fecha, "dd/MM/yyyy", "en-US")).subscribe(
      (dataByAPI: UserBitacora[]) => {
        console.log(dataByAPI);
        this.dataXDate = dataByAPI;
      }
    );
  }

  getTree() {
    //if(this.panelEstado)
    this.reporteService.getTree().subscribe(
      (dataByAPI: EstructuraReporte[]) => {
        //console.log(dataByAPI);
        this.dataTree = dataByAPI;
      }
    );
  }

  searchPerFolder(){
    console.log("sdasdasd");
    this.reporteService.getXFolder(formatDate(this.fmin,'dd/MM/yyyy','en-US'),formatDate(this.fmax,'dd/MM/yyyy','en-US'),this.txtEstructura).subscribe(
      (dataByAPI: User[]) =>{
        console.log(dataByAPI);
        this.dataEUsers = dataByAPI;
    });
  }

  imprimir(v: number) {
    var data;
    var tit;

    switch (v) {
      case 1:
        data = document.getElementById('XYEAR');
        tit = "DatosPorAño";
        break;
      case 2:
        data = document.getElementById('TREE');
        tit = "Arbol";
        break;
      case 3:
        //data = document.getElementById('TREE');
        //tit = "Arbol";
        break;
      case 4:
        data = document.getElementById('BITACORA');
        tit = "Bitacora";
        break;
      case 5:
        data = document.getElementById('REGISTRADOS');
        tit = "Clientes Registrados";
        break;
    }
    tit +='-'+ formatDate(new Date(),'dd-MM-yyyy','en-US');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = 295;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(tit + '.pdf');
    });
  }

}
