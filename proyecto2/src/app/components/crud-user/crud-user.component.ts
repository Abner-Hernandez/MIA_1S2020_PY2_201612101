import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserComponent } from '../create-user/create-user.component';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Tipousuario } from 'src/app/models/tipousuario';
import { TipousuarioService } from 'src/app/services/tipousuario.service';
import { Genero } from 'src/app/models/genero';
import { GeneroService } from 'src/app/services/genero.service';
import { Router } from '@angular/router';
import { ArchivoService } from 'src/app/services/archivo.service';
import { formatDate } from '@angular/common';

export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.scss']
})
export class CrudUserComponent implements OnInit {

  passControl = new FormControl('',[
    Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^!$%@#£€*?&]*[!$%@#£€*?&])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{9,}$')
  ]);

  match = new ErrorMatcher();

  user: User;
  fecha = new Date();

  C_PASSWORD: string = "";

  displayedColumns: string[] = ['NO_IDENTIFICADOR', 'USERNAME', 'NOMBRE', 'TIPO_USUARIO', 'actions'];
  ELEMENT_DATA: User[];

  tipoUsuario = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  tipoUsuarios: Tipousuario[] = [];

  genero = new FormControl('', [Validators.required]);
  generos: Genero[] = [];

  fi: any;

  constructor(private userService: UsersService, private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog,private tipoU: TipousuarioService, private gener: GeneroService,
    private _snackBar: MatSnackBar, private router: Router, private imagenService: ArchivoService) { }

  ngOnInit() {
    let ses = localStorage.getItem("tipo");
    if (ses) {
      if (!(localStorage.getItem("tipo") == 'Administrador')) {
        this.router.navigate(['denegado']);
      }
    }else {
      this.router.navigate(['denegado']);
    }
    this.user = new User();
    this.refresh();
    this.tipoU.getTipoUsuarios().subscribe(
      (tiposByApi: Tipousuario[]) => {
        this.tipoUsuarios = tiposByApi;
      }
    );
    this.gener.getGeneros().subscribe(
      (generosByApi: Genero[]) => {
        this.generos = generosByApi;
      }
    );
  }

  edit(row: any): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '500px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  delete(row: any) {
    this.userService.drop(row).subscribe(
      res => {
        this._snackBar.open("Se Elimino Correctamente al Usuario.", "", {
          duration: 2000,
        });
        this.refresh();
      },
      error => {
        this._snackBar.open("Hubo un Error al Eliminar el Usuario.", "", {
          duration: 2000,
        });
      }
    );
  }

  create() {
    this.user.BIRTH_DATE = formatDate(this.fecha,"dd/MM/yyyy",'en-US');
    this.userService.post(this.user).subscribe(
      res => {
        this._snackBar.open("Se Creo Correctamente al Usuario.", "", {
          duration: 2000,
        });
        this.refresh();
      },
      error => {
        this._snackBar.open("Hubo un Error al Crear el Usuario.", "", {
          duration: 2000,
        });
      }
    );
  }

  clear() {
    this.user = new User();
    this.C_PASSWORD = '';
  }

  refresh() {
    this.userService.get().subscribe(
      (usersByAPI: User[]) => {
        this.ELEMENT_DATA = usersByAPI;
        this.changeDetectorRefs.detectChanges();
      },
      error => {
        this._snackBar.open("Hubo un Error al Obtener los Usuarios del Sistema", "", {
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
    this.imagenService.subir("profile-"+localStorage.getItem("id"),this.fi).subscribe(
      (res: any) =>{
        this._snackBar.open("Se Subio Correctamente la Fotografia.", "", {
          duration: 2000,
        });
      },err =>{
        this._snackBar.open("Hubo un Error al Subir la Fotografia.", "", {
          duration: 2000,
        });
      }
    );
  }

}
