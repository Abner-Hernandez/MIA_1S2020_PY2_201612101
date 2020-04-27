import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Router } from '@angular/router';
import { ArchivoService } from 'src/app/services/archivo.service';
import { productService } from 'src/app/services/product.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Arbol } from 'src/app/models/arbol';
import { Categoria } from 'src/app/models/categoria';
import { CategoryService } from 'src/app/services/category.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { Color } from 'src/app/models/color';

export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-crud-productos',
  templateUrl: './crud-productos.component.html',
  styleUrls: ['./crud-productos.component.scss']
})
export class CrudProductosComponent implements OnInit {

  producto: Producto;
  ELEMENT_DATAC: Categoria[];
  TREE_DATA: Arbol[] = [];
  ELEMENT_DATA: Producto[] = [];
  nombre_categoria: string = "Ninguno";
  id_selected: number = -1;
  displayedColumns: string[] = ['NO_IDENTIFICADOR', 'NOMBRE', 'CODIGO', 'PRICE', 'actions'];
  color = new FormControl('', [Validators.required]);
  colores: Color[] = [];
  colores_selected: Color[] = [];
  color_selected: Color ;
  color_add_edit: string;
  color_selected_add: Color;
  //genero = new FormControl('', [Validators.required]);
  //generos: Genero[] = [];

  fi: any;

  constructor(private router: Router, private imagenService: ArchivoService, private productService: productService,public dialog: MatDialog,
    private _snackBar: MatSnackBar,  private changeDetectorRefs: ChangeDetectorRef, private categoryService: CategoryService) { this.dataSource.data = this.TREE_DATA }

  treeControl = new NestedTreeControl<Arbol>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Arbol>();
  
  
  hasChild = (_: number, node: Arbol) => !!node.children && node.children.length > 0;

  ngOnInit() {
    let ses = localStorage.getItem("tipo");
    if (ses) {
      if (!(localStorage.getItem("tipo") == 'Administrador') && !(localStorage.getItem("tipo") == 'Server') && !(localStorage.getItem("tipo") == 'Client')) {
        this.router.navigate(['denegado']);
      }
    }else {
      this.router.navigate(['denegado']);
    }
    this.producto = new Producto();
    this.refresh();
    this.get_all_colors();
  }

  add_color(){
    this.colores_selected.push(this.color_selected);
  }

  get_all_colors()
  {    
    this.productService.get_all_colors().subscribe(
    (colorsbyapi: Color[]) => {
      if(colorsbyapi.length < 1)
        return;
      this.colores = colorsbyapi;
      this.changeDetectorRefs.detectChanges();
    },
    error => {
      this._snackBar.open("Hubo un Error al Obtener los Colores", "", {
        duration: 2000,
      });
    }
  );

  }

  refresh() {
    this.productService.productosbyid(localStorage.getItem("id")).subscribe(
      (usersByAPI: Producto[]) => {
        if(usersByAPI.length < 1)
          return;
        this.ELEMENT_DATA = usersByAPI;
        this.changeDetectorRefs.detectChanges();
      },
      error => {
        this._snackBar.open("Hubo un Error al Obtener los Productos", "", {
          duration: 2000,
        });
      }
    );

    this.TREE_DATA = [];
    this.categoryService.categorias().subscribe(
      (usersByAPI: Categoria[]) => {
        this.ELEMENT_DATAC = usersByAPI;
        this.changeDetectorRefs.detectChanges();
        this.createTree();
      },
      error => {
        this._snackBar.open("Hubo un Error al Obtener las Categorias", "", {
          duration: 2000,
        });
      }
    );
  }

  createTree(){
    this.categoryService.categorias_padres().subscribe(
      (padres: Categoria[]) => {
        for(var i = 0 ; i < padres.length ; i++)
        {
          var ab = new Arbol(padres[i].CATEGORY_ID, padres[i].CATEGORY_NAME);
          this.TREE_DATA.push(ab);
          var id_parent = {CATEGORIA: padres[i].CATEGORY_ID};
          this.getHijas(ab, id_parent)
        }
      },
      error => {
        this._snackBar.open("Hubo un Error al Obtener las categorias padres", "", {
          duration: 2000,
        });
      }
    );

  }

  getHijas(ab: Arbol, id_parent)
  {
    this.categoryService.posthijas(id_parent).subscribe(
      (hijas: Categoria[]) => {
        if(hijas.length < 1)
          return;
        for(var j = 0 ; j < hijas.length ; j++)
        {
          var abc = new Arbol(hijas[j].CATEGORY_ID, hijas[j].CATEGORY_NAME);
          ab.children.push(abc);
          var id_parent = {CATEGORIA: hijas[j].CATEGORY_ID};
          this.getHijas(abc, id_parent)
        }
        this.dataSource.data = [];
        this.dataSource.data = this.TREE_DATA;
        this.treeControl.collapseAll();
      },
      error => {
        this._snackBar.open("Hubo un Error al Obtener las Categorias hijas", "", {
          duration: 2000,
        });
      }
    );
  }

  getnode(node: Arbol) {
    this.nombre_categoria = node.name;
    this.id_selected = node.id;
  }

  /*
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
    this.imagenService.subir("product-"+localStorage.getItem("username"),this.fi).subscribe(
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
  */

  create() {
    this.producto.USUARIO_ID = parseInt(localStorage.getItem("id"));
    this.producto.CATEGORY_ID = this.id_selected;

    this.productService.insertar(this.producto).subscribe(
      res => {

        this.productService.get_producto_by_name(this.producto.PRODUCT_NAME).subscribe(
          (prod: Producto[]) => {
            
            for(var i = 0 ; i < this.colores_selected.length ; i++)
            {
              this.colores_selected[i].PRODUCT_ID = prod[0].PRODUCT_ID;
              this.productService.insertar_producto_color(this.colores_selected[i]).subscribe(
                res => {
                  this._snackBar.open("Se Creo Correctamente el Producto.", "", {
                    duration: 2000,
                  });
                },
                error => {
                  this._snackBar.open("Hubo un Error al Crear el Producto.", "", {
                    duration: 2000,
                  });
                });
            }

          },
          error => {
            this._snackBar.open("Hubo un Error al Crear el Producto.", "", {
              duration: 2000,
            });
          });
        
        this.refresh();
      },
      error => {
        this._snackBar.open("Hubo un Error al Crear el Producto.", "", {
          duration: 2000,
        });
      }
    );
  }

  clear() {
    this.nombre_categoria = "Ninguno";
    this.id_selected = -1;
    this.producto = new Producto();
  }

  edit(row: any): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '500px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  delete(row: any) {
    this.productService.eliminar(row).subscribe(
      res => {
        this._snackBar.open("Se Elimino Correctamente al Producto.", "", {
          duration: 2000,
        });
        this.refresh();
      },
      error => {
        this._snackBar.open("Hubo un Error al Eliminar el Producto.", "", {
          duration: 2000,
        });
      }
    );
  }

  delete_color()
  {
    if(this.color_selected_add.COLOR_ID != null)
    {
      this.productService.eliminar_color(this.color_selected_add).subscribe(
        res => {
          this._snackBar.open("Se Elimino Correctamente el color.", "", {
            duration: 2000,
          });
          this.get_all_colors();
        },
        error => {
          this._snackBar.open("Hubo un Error al Eliminar el color.", "", {
            duration: 2000,
          });
        }
      );
    }
  }

  insertar_color()
  {
    if(this.color_add_edit != null)
    {
      this.productService.insertar_color(this.color_add_edit).subscribe(
        res => {
          this._snackBar.open("Se Creo Correctamente el color.", "", {
            duration: 2000,
          });
          this.get_all_colors();
        },
        error => {
          this._snackBar.open("Hubo un Error al Crear el color.", "", {
            duration: 2000,
          });
        }
      );
    }
  }

  editar_color()
  {
    if(this.color_selected_add.COLOR_ID != null && this.color_add_edit != null)
    {
      this.color_selected_add.COLOR_NAME = this.color_add_edit;
      this.productService.editar_color(this.color_selected_add).subscribe(
        res => {
          this._snackBar.open("Se Creo Correctamente el color.", "", {
            duration: 2000,
          });
          this.get_all_colors();
        },
        error => {
          this._snackBar.open("Hubo un Error al Crear el color.", "", {
            duration: 2000,
          });
        }
      );
    }
  }

  changefile(event: any){
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

  subirFile(){
    this.imagenService.subir("masive.csv",this.fi).subscribe(
      (res: any) =>{
        this._snackBar.open("Se Subio Correctamente el archivo de carga.", "", {
          duration: 2000,
        });
      },err =>{
        this._snackBar.open("Hubo un Error al Subir el archivo de carga.", "", {
          duration: 2000,
        });
      }
    );
  }
}
