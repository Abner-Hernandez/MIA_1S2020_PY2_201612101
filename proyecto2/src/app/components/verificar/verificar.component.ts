import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.scss']
})
export class VerificarComponent implements OnInit {

  usr: number ;
  tit: string = "";
  cont: string = "";

  constructor(private parametros: Router, private userService: UsersService) { }

  ngOnInit() {
    this.usr = this.parametros.parseUrl(this.parametros.url).queryParams['un'];
    var us = new User();
    us.USUARIO_ID = this.usr;

    this.userService.getById(us).subscribe(
      (datosByApi: User[]) => {
        if(datosByApi[0].ESTADO == 0){

          this.userService.verificar(this.usr).subscribe(
            (res) => {
              this.tit = "Verificacion Exitosa: "+ datosByApi[0].USUARIO_NAME;
              this.cont = "Sea Bienvenido a nuestra plataforma, esperamos que la disfrute.";
            }
          );

        }else if(datosByApi[0].ESTADO == 1){
          this.tit = "Tu Cuenta a ha sido Verificada";
              this.cont = "Ya puede navegar y disfrutar de los servicios que le ofrecemos.";
        }else if(datosByApi[0].ESTADO == 2){
          this.tit = "Ops!! Lo sentimos " + datosByApi[0].USUARIO_NAME;
              this.cont = "Este link ha expirado, te enviamos un correo nuevo, tienes 1 minuto para hacer click en el Enlace.";
              var us = new User();
              us.USUARIO_ID = this.usr;
              
              this.userService.reenviar(us).subscribe(res => {});
        }
      }
    );
    //console.log(this.parametros.snapshot.params.username);
  }

}
