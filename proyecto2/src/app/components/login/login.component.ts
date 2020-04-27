import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface LoginData {
  email: string;
  password: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  email: string = ''; 
  password: String = '';



  constructor(private router: Router, private userService: UsersService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginData,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {

    
  }

  login() {
    var env = new User();
    env.MAIL = this.email;

    this.userService.getByMail(env).subscribe(
      (UserFromAPI: any) => {

        if (UserFromAPI.length > 0 && UserFromAPI[0].MAIL == this.email) {
          if (UserFromAPI[0].PASSWORD_USER == this.password) {
            
            if(UserFromAPI[0].ESTADO == 0 || UserFromAPI[0].ESTADO == 2){
              this._snackBar.open("No puedes acceder, cuenta No Verificada, Revisa tu correo ;)", "", {
                duration: 2000,
              });
              return;
            }
            
            localStorage.setItem("username",JSON.parse(JSON.stringify(UserFromAPI[0].MAIL)));
            localStorage.setItem("id",JSON.parse(JSON.stringify(UserFromAPI[0].USUARIO_ID)));
            localStorage.setItem("tipo",JSON.parse(JSON.stringify(UserFromAPI[0].NAME_TYPE)));
            localStorage.setItem("estado",JSON.parse(JSON.stringify(UserFromAPI[0].ESTADO)));
            
            this.onNoClick();

            this.router.navigate(['inicio']);

          } else {
            this._snackBar.open("Contraseña Invalida", "", {
              duration: 2000,
            });
          }
        } else {
          this._snackBar.open("Usuario Invalido", "", {
            duration: 2000,
          });
        }
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
