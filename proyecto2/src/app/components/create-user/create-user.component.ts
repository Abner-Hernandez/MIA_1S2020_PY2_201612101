import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { TipousuarioService } from 'src/app/services/tipousuario.service';
import { TipoclienteService } from 'src/app/services/tipocliente.service';
import { GeneroService } from 'src/app/services/genero.service';
import { Tipousuario } from 'src/app/models/tipousuario';
import { Tipocliente } from 'src/app/models/tipocliente';
import { Genero } from 'src/app/models/genero';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import { ArchivoService } from 'src/app/services/archivo.service';
import { formatDate } from '@angular/common';
import { Email } from 'src/app/models/email';
import { Datos } from 'src/app/models/datos';
import { DatosService } from 'src/app/services/datos.service';

export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  passControl = new FormControl('',[
    Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^!$%@#£€*?&]*[!$%@#£€*?&])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{9,}$')
  ]);

  match = new ErrorMatcher();

  editar: boolean = false;
  registrar: boolean = false;
  id_genero: number = 0;

  fecha = new Date();
  mail = new Email();

  tipoUsuario = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  tipoUsuarios: Tipousuario[] = [];

  genero = new FormControl('', [Validators.required]);
  generos: Genero[] = [];

  tipoClientes: Tipocliente[] = [];

  fi: any;

  constructor(private userService: UsersService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private _snackBar: MatSnackBar,private tipoU: TipousuarioService, private gener: GeneroService, private tipoC: TipoclienteService,
    private router: Router,private emailService: EmailService, private imagenService: ArchivoService, private infoService: DatosService) { }

  ngOnInit() {
    
    if(this.user.USUARIO_NAME == ""){
      this.registrar = true;
      this.editar = false;
    }else{
      this.registrar = false;
      this.editar = true;
    }
    let ses = localStorage.getItem("tipo");
    if (ses) {
      if (this.editar == true && localStorage.getItem("tipo") != 'Administrador') {
        this.router.navigate(['denegado']);
      }
    }else {
      if(this.registrar == false){
        this.router.navigate(['denegado']);
      }
      
    }

    var parts = this.user.BIRTH_DATE.split('/');
    this.fecha = new Date(parseInt(parts[2] , 10), parseInt(parts[1], 10)-1, parseInt(parts[0] , 10));
    //this.fecha = new Date(this.user.BIRTH_DATE);

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
    this.tipoC.getTipoCliente().subscribe(
      (tiposByApi: Tipocliente[]) => {
        this.tipoClientes = tiposByApi;
      }
    );
  }

  edit(){
    this.user.BIRTH_DATE = formatDate(this.fecha,"dd/MM/yyyy",'en-Us');
    this.userService.update(this.user).subscribe(
      res => {
        this._snackBar.open("Se Actualizo correctamente al Usuario.", "", {
          duration: 2000,
        });
      },
      error => {
        this._snackBar.open("Hubo un Error al actualizar el Usuario.", "", {
          duration: 2000,
        });
      }
    );
  }

  register() {
    this.mail = new Email();
    this.user.TYPE_USUARIO_ID = 3;
    this.user.BIRTH_DATE = formatDate(this.fecha,"dd/MM/yyyy",'en-US');
    
    var id_random = Math.floor(Math.random() * (this.tipoClientes.length - 0 + 1) ) + 0;
    this.user.CLASS_CLIENT_ID = id_random+1;
    this.user.AVAILABLE_CREDIT = this.tipoClientes[id_random].CREDIT_AMOUNT;

    this.mail.asunto = "Activacion de la cuenta";
    this.mail.destino = this.user.MAIL;

    /*
    this.infoService.getInformation().subscribe(
      (infoApi: Datos[]) => {
        this.mail.page_logo = infoApi[0].PAGE_LOGO;
        this.mail.page_name = infoApi[0].PAGE_NAME;
      }, error => {
        this._snackBar.open("Hubo un Error al Obtener los Dato.", "", {
          duration: 2000,
        });
      }
    );

    this.infoService.getInformation().subscribe(
      (infoApi: Datos[]) => {
        this.mail.page_logo = infoApi[0].PAGE_LOGO;
        this.mail.page_name = infoApi[0].PAGE_NAME;
      }, error => {
        this._snackBar.open("Hubo un Error al Obtener los Dato.", "", {
          duration: 2000,
        });
      }
    );
    */
    
    //AVAILABLE_CREDIT,CLASS_CLIENT_ID,
    this.userService.post(this.user).subscribe(
      res => {
        console.log(res);
        this._snackBar.open("Se creo Correctamente al Usuario: "+this.user.USUARIO_NAME, "", {
          duration: 2000,
        });

        this.userService.getidusuario(this.user).subscribe(
          (info: any) => {
            this.mail.username = info[0].USUARIO_ID;
            //this.userService.
            this.emailService.enviarVerificar(this.mail).subscribe(
              res => {
                console.log(res);
                this._snackBar.open("Por favor revisar el correo para activar su cuenta: "+this.user.MAIL, "", {
                  duration: 2000,
                });
                this.user = new User();
              },
              error => {
                this._snackBar.open("Hubo un Error al enviar el correo de confirmacion.", "", {
                  duration: 2000,
                });
              }
            );
          }, error => {
            this._snackBar.open("Hubo un Error al Obtener los Dato.", "", {
              duration: 2000,
            });
          }
        );

      },
      error => {
        this._snackBar.open("Hubo un Error al Crear al Usuario.", "", {
          duration: 2000,
        });
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
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
    this.imagenService.subir("profile-"+localStorage.getItem("username"),this.fi).subscribe(
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
