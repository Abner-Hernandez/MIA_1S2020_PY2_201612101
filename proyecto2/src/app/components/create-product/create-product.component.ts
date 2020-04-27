import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Categoria } from 'src/app/models/categoria';
import { Arbol } from 'src/app/models/arbol';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArchivoService } from 'src/app/services/archivo.service';
import { productService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Color } from 'src/app/models/color';

export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  ELEMENT_DATAC: Categoria[];
  TREE_DATA: Arbol[] = [];
  nombre_categoria: string = "Ninguno";
  id_selected: number = -1;
  fi: any;
  editar: boolean = false;
  registrar: boolean = false;
  previos_name: string = "";
  previos_parent: number ;
  color = new FormControl('', [Validators.required]);
  colores: Color[] = [];
  colores_selected: Color[] = [];
  color_selected_add: Color ;
  color_selected_del: Color ;
  auxProducto: Producto;

  constructor(private router: Router, private imagenService: ArchivoService, private productService: productService,public dialog: MatDialog,
    private _snackBar: MatSnackBar,  private categoryService: CategoryService, private changeDetectorRefs: ChangeDetectorRef, 
    @Inject(MAT_DIALOG_DATA) public producto: Producto
  ) { this.dataSource.data = this.TREE_DATA }

  treeControl = new NestedTreeControl<Arbol>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Arbol>();
  
  
  hasChild = (_: number, node: Arbol) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    if(this.producto.PRODUCT_NAME == ""){
      this.registrar = true;
      this.editar = false;
    }else{
      this.registrar = false;
      this.editar = true;
    }

    this.auxProducto = this.producto;

    let ses = localStorage.getItem("tipo");
    if (ses) {
      if (!(localStorage.getItem("tipo") == 'Administrador') && !(localStorage.getItem("tipo") == 'Server') && !(localStorage.getItem("tipo") == 'Client')) {
        this.router.navigate(['denegado']);
      }
    }else {
      this.router.navigate(['denegado']);
    }
    this.refresh();
    this.get_parent();
    this.get_all_colors();
    this.get_all_colors_of_product();
  }

  get_parent(){
    if(this.producto.CATEGORY_ID == null)
      return;
    var aux: Categoria = new Categoria();
    aux.CATEGORY_ID = this.producto.CATEGORY_ID;
    this.categoryService.get_data_by_id(aux).subscribe(
      (infobyapi: Categoria[]) => {
        this.nombre_categoria = infobyapi[0].CATEGORY_NAME;
      },
      error => {
        this._snackBar.open("Hubo un Error al actualizar la categoria.", "", {
          duration: 2000,
        });
      }
    );
  }

  delete_color()
  {
    if(this.color_selected_del != null)
    {
      this.productService.eliminar_producto_color(this.color_selected_del).subscribe(
        res => {
          this._snackBar.open("Se a eliminado el color seleccionado del producto.", "", {
            duration: 2000,
          });
        },
        error => {
          this._snackBar.open("Hubo un Error al eliminar el color del producto.", "", {
            duration: 2000,
          });
        }
      );
    }
  }

  add_color()
  {
    if(this.color_selected_add != null)
    {
      this.color_selected_add.PRODUCT_ID = this.producto.PRODUCT_ID;
      this.productService.insertar_producto_color(this.color_selected_add).subscribe(
        res => {
          this._snackBar.open("Se a agregado un nuevo color al producto.", "", {
            duration: 2000,
          });
          this.get_all_colors_of_product()

        },
        error => {
          this._snackBar.open("Hubo un Error al agregar un nuevo color al producto.", "", {
            duration: 2000,
          });
        }
      );
    }
  }

  refresh() {
    this.TREE_DATA = [];
    this.categoryService.categorias().subscribe(
      (usersByAPI: Categoria[]) => {
        this.ELEMENT_DATAC = usersByAPI;
        this.changeDetectorRefs.detectChanges();
        this.createTree();
      },
      error => {
        this._snackBar.open("Hubo un Error al Obtener los Usuarios del Sistema", "", {
          duration: 2000,
        });
      }
    );
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

  get_all_colors_of_product()
  {    
    this.productService.get_all_colors_by(this.producto.PRODUCT_ID).subscribe(
    (colorsbyapi: Color[]) => {
      if(colorsbyapi.length < 1)
        return;
      this.colores_selected = colorsbyapi;
      this.changeDetectorRefs.detectChanges();
    },
    error => {
      this._snackBar.open("Hubo un Error al Obtener los Colores", "", {
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
        this._snackBar.open("Hubo un Error al Obtener los Usuarios del Sistema", "", {
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
        this._snackBar.open("Hubo un Error al Obtener los Usuarios del Sistema", "", {
          duration: 2000,
        });
      }
    );
  }

  clear() {
    this.producto = this.auxProducto;
  }

  getnode(node: Arbol) {
    this.nombre_categoria = node.name;
    this.id_selected = node.id;
  }

  edit()
  {

    if(this.id_selected > 0)
      this.producto.CATEGORY_ID = this.id_selected;

    this.productService.update(this.producto).subscribe(
      res => {
        this._snackBar.open("Se edito correctamente el producto", "", {
          duration: 2000,
        });
      },
      error => {
        this._snackBar.open("Hubo un Error al Editar el producto", "", {
          duration: 2000,
        });
        this.producto = this.auxProducto;
      }
    );
  }
}
