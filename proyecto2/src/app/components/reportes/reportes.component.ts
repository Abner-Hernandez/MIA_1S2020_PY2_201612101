import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { ReportesService } from 'src/app/services/reportes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  reporte2: number = 0 ;
  displayedColumns2: string[] = ['NO_IDENTIFICADOR', 'USERNAME', 'NOMBRE', 'TIPO_USUARIO'];
  REPORTE2: User[];

  reporte3: number = 0 ;
  displayedColumns3: string[] = ['NO_IDENTIFICADOR', 'USERNAME', 'NOMBRE', 'TIPO_USUARIO'];
  REPORTE3: User[];

  reporte4: number = 0 ;
  displayedColumns4: string[] = ['NO_IDENTIFICADOR', 'USERNAME', 'NOMBRE', 'TIPO_USUARIO'];
  REPORTE4: User[];

  displayedColumns6: string[] = ['NOMBRE', 'VENTAS'];
  REPORTE6: any[];

  displayedColumns7: string[] = ['NOMBRE', 'PRODUCTOS'];
  REPORTE7: any[];

  reporte10: number = 0 ;
  displayedColumns10: string[] = ['NOMBRE', 'CODIGO', 'PRICE'];
  REPORTE10: Producto[];

  constructor(private reportesService: ReportesService, private _snackBar: MatSnackBar, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {

  }

  reporte(opc: number) {
    switch (opc) {
      case 2:
        if(this.reporte2 < 1)
          return;
        this.reportesService.reporte2(this.reporte2).subscribe(
          (usersByAPI: User[]) => {
            this.REPORTE2 = usersByAPI;
            this.changeDetectorRefs.detectChanges();
          },
          error => {
            this._snackBar.open("Hubo un Error al Obtener los Usuarios", "", {
              duration: 2000,
            });
          }
        );        
        break;
      case 3:
        if(this.reporte3 < 1)
          return;
        this.reportesService.reporte3(this.reporte2).subscribe(
          (usersByAPI: User[]) => {
            this.REPORTE3 = usersByAPI;
            this.changeDetectorRefs.detectChanges();
          },
          error => {
            this._snackBar.open("Hubo un Error al Obtener los Usuarios", "", {
              duration: 2000,
            });
          }
        );    
        //this.router.navigate(['datos']);
        break;
      case 4:
        this.reportesService.reporte4().subscribe(
          (usersByAPI: User[]) => {
            this.REPORTE4 = usersByAPI;
            this.changeDetectorRefs.detectChanges();
          },
          error => {
            this._snackBar.open("Hubo un Error al Obtener los Productos.", "", {
              duration: 2000,
            });
          }
        );
        break;
      case 6:
        this.reportesService.reporte6().subscribe(
          (api: any[]) => {
            this.REPORTE6 = api;
            this.changeDetectorRefs.detectChanges();
          },
          error => {
            this._snackBar.open("Hubo un Error al Obtener los Usuarios.", "", {
              duration: 2000,
            });
          }
        );
        break;
      case 7:
        this.reportesService.reporte7().subscribe(
          (api: any[]) => {
            this.REPORTE7 = api;
            this.changeDetectorRefs.detectChanges();
          },
          error => {
            this._snackBar.open("Hubo un Error al Obtener los Usuarios.", "", {
              duration: 2000,
            });
          }
        );
        break;
      case 10:
        this.reportesService.reporte10(this.reporte10).subscribe(
          (api: Producto[]) => {
            this.REPORTE10 = api;
            this.changeDetectorRefs.detectChanges();
          },
          error => {
            this._snackBar.open("Hubo un Error al Obtener los productos.", "", {
              duration: 2000,
            });
          }
        );
        break;

    }
  }

/*
metodo get
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

    post

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
*/

}
