import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { Datos } from 'src/app/models/datos';
import { MatSnackBar } from '@angular/material';
import * as RandExp from "randexp";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  constructor(private infoService: DatosService, private _snackBar: MatSnackBar) { }

  urlVideo: String = "";
  cadAbout: String = "";
  cadMision: String = "";
  cadVision: String = "";
  cadSlogan: String = "";

  ngOnInit() {
    var p = new RandExp('(a|b|c){3,10}');
    
    this.infoService.getInformation().subscribe(
      (infoApi: Datos[]) => {
        this.urlVideo = infoApi[0].PAGE_VIDEO;
        this.cadAbout = infoApi[0].PAGE_ABOUT;
        this.cadMision = infoApi[0].PAGE_MISSION;
        this.cadVision = infoApi[0].PAGE_VISION;
        this.cadSlogan = infoApi[0].PAGE_SLOGAN;
      }, error => {
        this._snackBar.open("Hubo un Error al Obtener los Dato.", "", {
          duration: 2000,
        });
      }
    );
  }

}
