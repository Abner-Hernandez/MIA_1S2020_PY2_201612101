import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { FormControl, Validators } from '@angular/forms';
import { Genero } from 'src/app/models/genero';
import { GeneroService } from 'src/app/services/genero.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArchivoService } from 'src/app/services/archivo.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User = new User();
  fecha = new Date();
  foto: string;

  fi: any;

  genero = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  generos: Genero[] = [];

  constructor(private router: Router, private userService: UsersService, private gener: GeneroService,
    private _snackBar: MatSnackBar,private imagenService: ArchivoService) { }

  ngOnInit() {
    this.user.TEL_NUMBER = 0;
    this.user.ESTADO = 0;
    this.fecha = new Date("01/01/2000");
    var ses = localStorage.getItem("username");
    if (ses) {
      this.user.MAIL = localStorage.getItem("username");
      this.refresh();
    } else {
      this.router.navigate(['']);
    }
  }

  modificar() {
    this.user.BIRTH_DATE = formatDate(this.fecha,"dd/MM/yyyy",'en-US');
    this.userService.update(this.user).subscribe(
      (res) => {
        this._snackBar.open("Se Modificaron Correctamente los Datos.", "", {
          duration: 2000,
        });
        this.refresh();
      }, error => {
        this._snackBar.open("Hubo un Error al Modificar los Datos.", "", {
          duration: 2000,
        });
      }
    );
  }

  

  refresh() {
    this.userService.getByMail(this.user).subscribe(
      (userById: User[]) => {
        this.user = userById[0];
        var parts = this.user.BIRTH_DATE.split('/');
        this.fecha = new Date(parseInt(parts[2] , 10), parseInt(parts[1], 10)-1, parseInt(parts[0] , 10));
        this.foto = "assets/profile-"+ this.user.USUARIO_ID;
        //this.foto = "/home/archivo/profile-" + this.user.USUARIO_ID + ".png";
      }, error => {
        this._snackBar.open("Hubo un Error al Obtener los Datos.", "", {
          duration: 2000,
        });
      }
    );
    this.gener.getGeneros().subscribe(
      (generosByApi: Genero[]) => {
        this.generos = generosByApi;
      },error => {
        this._snackBar.open("Hubo un Error al Obtener los Datos.", "", {
          duration: 2000,
        });
      }
    );
  }

  changeImage(event: any){
    if(event.target.files && event.target.files.length>0){
      const f = event.target.files[0];
      const r = new FileReader();
      r.readAsDataURL(f);
      r.onload = function l(){
        this.img = r.result;
      }.bind(this);
      this.fi = f;
    }
  }

  subirImagen(){
    this.imagenService.subir("profile-"+this.user.USUARIO_ID,this.fi).subscribe(
      (res: any) =>{
        var us = new User();
        console.log(this.userService.URL_API);
        this._snackBar.open("Se Subio Correctamente la Fotografia.", "", {
          duration: 2000,
        });
      },err =>{
        this._snackBar.open("Hubo un error al Subir la Fotografia", "", {
          duration: 2000,
        });
        console.log(err);
      }
    );
  }

}