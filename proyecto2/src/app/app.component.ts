import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { DatosService } from './services/datos.service';
import { User } from './models/user';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { Datos } from './models/datos';
import { CreateFacturaComponent } from './components/create-factura/create-factura.component';
import { ReportesComponent } from './components/reportes/reportes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  logeado: boolean = false;

  state: String = 'Log In';
  boolean_state: boolean = false;
  boolean_admin: boolean = false;
  boolean_cliente: boolean = false;
  boolean_servidor: boolean = false;
  boolean_root: boolean = false;
  boolean_estado: boolean = true;

  nombreApp: string = "";
  urlLogo: string = "";
  cadSlogan: String = "";

  constructor(private router: Router, public dialog: MatDialog, private infoService: DatosService) { }

  ngOnInit() {
    let ses = localStorage.getItem("username");
    if (ses) {
      //this.router.navigate(['inicio']);
      this.boolean_state = true;
    }
    ses = localStorage.getItem("tipo");
    if (ses) {
      if (localStorage.getItem("tipo") == 'Administrador') {
        this.boolean_admin = true;
      } else if (localStorage.getItem("tipo") == 'Client') {
        this.boolean_cliente = true;
      } else {
        this.boolean_servidor = true;
      }
    }
    ses = localStorage.getItem("estado");
    if (ses) {
      if (localStorage.getItem("tipo") != '3') {
        this.boolean_estado = true;
      } else {
        this.boolean_estado = false;
      }
    }
    this.infoService.getInformation().subscribe(
      (infoApi: Datos[]) => {
        console.log();
        this.nombreApp = infoApi[0].PAGE_NAME;
        this.urlLogo = infoApi[0].PAGE_LOGO;
        this.cadSlogan = infoApi[0].PAGE_SLOGAN;
      }
    );
  }

  logout() {
    localStorage.clear();
    this.boolean_state = false;
    this.boolean_admin = false;
    this.boolean_cliente = false;
    this.boolean_servidor = false;
    this.state = 'Log In';
    this.router.navigate(['']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      let ses = localStorage.getItem("username");
      if (ses) {
        if (this.state == 'Log In') {
          this.state = 'Log Out';
          this.boolean_state = true;
        }
      }
      ses = localStorage.getItem("tipo");
      if (ses) {
        if (localStorage.getItem("tipo") == 'Administrador') {
          this.boolean_admin = true;
        } else if (localStorage.getItem("tipo") == 'Cliente') {
          this.boolean_cliente = true;
        }
        if(localStorage.getItem("estado") == '3'){
          this.boolean_estado = false;
        }
      }
    });
  }

  openRegistrar(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '500px',
      data: new User()
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  irHome(){
    this.router.navigate(['']);
  }

  irTienda()
  {
    this.router.navigate(['tienda']);
  }

  opciones(opc: number) {
    switch (opc) {
      case 1:
        this.router.navigate(['inicio']);
        break;
      case 2:
        this.router.navigate(['users']);
        break;
      case 3:
        this.router.navigate(['datos']);
        break;
      case 4:
        this.router.navigate(['products']);
        break;
      case 5:
        this.router.navigate(['categorias']);
        break;
      case 6:
        this.router.navigate(['tienda']);
        break;
      case 8:
        const dialogRef1 = this.dialog.open(ReportesComponent, {
          width: '800px',
        });
    
        dialogRef1.afterClosed().subscribe(result => {
          
        });
        break;
      case 9:
        const dialogRef = this.dialog.open(CreateFacturaComponent, {
          width: '800px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          
        });
        break;
    }
  }

}
