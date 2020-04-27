import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { Datos } from 'src/app/models/datos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ArchivoService } from 'src/app/services/archivo.service';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admindatos',
  templateUrl: './admindatos.component.html',
  styleUrls: ['./admindatos.component.scss']
})
export class AdmindatosComponent implements OnInit {

  info: Datos;

  img: any;
  fi: any;
  vi: any;

  constructor(private infoDatos: DatosService, private _snackBar: MatSnackBar, private router: Router, private changeDetectorRefs: ChangeDetectorRef
    , private imagenService: ArchivoService,private userService: UsersService) { }

  ngOnInit() {
    let ses = localStorage.getItem("tipo");
    if (ses) {
      if (localStorage.getItem("tipo") != 'Administrador') {
        this.router.navigate(['denegado']);
      }
    } else {
      this.router.navigate(['denegado']);
    }
    this.info = new Datos();
    this.refresh();
  }

  modificar() {
    this.infoDatos.postInformation(this.info).subscribe(
      (res) => {
        this._snackBar.open("Se Modificaron los Datos Correctamente", "", {
          duration: 2000,
        });
        this.refresh();
      }, error => {
        this._snackBar.open("Hubo un Error al Actualizar los Datos", "", {
          duration: 2000,
        });
      }
    );
  }

  refresh() {
    this.infoDatos.getInformation().subscribe(
      (infoByApi: Datos[]) => {
        this.info = infoByApi[0];
        this.changeDetectorRefs.detectChanges();
      },
      error => {
        this._snackBar.open("Error al Obtener los Datos", "", {
          duration: 2000,
        });
      }
    );
  }

  changeImage(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const f = event.target.files[0];
      const r = new FileReader();
      r.readAsDataURL(f);
      r.onload = function l() {
        this.img = r.result;
      }.bind(this);
      this.fi = f;
    }
  }

  subirImagen() {
    this.imagenService.subir("logo", this.fi).subscribe(
      (res: any) => {
        this.info.PAGE_LOGO = 'assets/logo';
        this.infoDatos.putLogo(this.info).subscribe();
        this._snackBar.open("Se Actualizo Correctamente el Logo", "", {
          duration: 2000,
        });
      }, err => {
        this._snackBar.open("No Actualizo Correctamente el Logo", "", {
          duration: 2000,
        });
      }
    );
  }

  changeVideo(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const f = event.target.files[0];
      const r = new FileReader();
      r.readAsDataURL(f);
      r.onload = function l() {
        this.vid = r.result;
      }.bind(this);
      this.vi = f;
    }
  }

  subirVideo() {
    this.imagenService.subir("video", this.vi).subscribe(
      (res: any) => {
        this.info.PAGE_VIDEO = 'assets/video';
        this.infoDatos.putVideo(this.info).subscribe();
        this._snackBar.open("Se Actualizo Correctamente el Video", "", {
          duration: 2000,
        });
      }, err => {
        this._snackBar.open("No Actualizo Correctamente el Video", "", {
          duration: 2000,
        });
      }
    );
  }
  
  changeFile(event: any) {
    var s = '';
    if (event.target.files && event.target.files.length > 0) {
      const f = event.target.files[0];
      const r = new FileReader();
      r.readAsText(f);
      r.onload = function l() {
        s = r.result.toString();
        this.uSync = JSON.parse(s);
        
        //console.log(JSON.parse(JSON.stringify(s)));
      }.bind(this);
    }
    //console.log(s);
    
    
  }

}
