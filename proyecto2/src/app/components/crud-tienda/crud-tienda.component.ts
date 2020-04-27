import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Arbol } from 'src/app/models/arbol';
import { CategoryService } from 'src/app/services/category.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { productService } from 'src/app/services/product.service';
import { ViewProductComponent } from '../view-product/view-product.component';

export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-crud-tienda',
  templateUrl: './crud-tienda.component.html',
  styleUrls: ['./crud-tienda.component.scss']
})
export class CrudTiendaComponent implements OnInit {

  busqueda:string;
  TREE_DATA: Arbol[] = [];
  ELEMENT_DATA: Categoria[];
  isChecked: boolean = false;
  productos: Producto [] = [];
  id_selected: number = -1;
  cantidad: number = 0;


  constructor(private changeDetectorRefs: ChangeDetectorRef, private categoryService: CategoryService, private productService:productService,
  public dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router) { this.dataSource.data = this.TREE_DATA}

  treeControl = new NestedTreeControl<Arbol>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Arbol>();


  hasChild = (_: number, node: Arbol) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.refresh();
    this.get_all_products();
  }

  refresh() {
    this.TREE_DATA = [];
    this.categoryService.categorias().subscribe(
      (usersByAPI: Categoria[]) => {
        this.ELEMENT_DATA = usersByAPI;
        this.changeDetectorRefs.detectChanges();
        this.createTree();
        console.log("nada");
      },
      error => {
        this._snackBar.open("Hubo un Error al Obtener los Usuarios del Sistema", "", {
          duration: 2000,
        });
      }
    );
  }

  get_products_by_category() {

    if(this.id_selected < 1)
      return;

    this.productos = [];
    this.categoryService.get_all_hijas(this.id_selected).subscribe(
      (categorias: Categoria[]) => {
        for(var i = 0 ; i < categorias.length ; i++)
        {
          this.productService.get_all_prod_by_categoria(categorias[i].CATEGORY_ID).subscribe(
            (productos: Producto[]) => {

              for(var j = 0 ; j < productos.length ; j++)
              {
                this.productos.push(productos[j]);
              }
              this.changeDetectorRefs.detectChanges();
            },
            error => {
              this._snackBar.open("Hubo un Error al Obtener los productos con un tipo de categoria", "", {
                duration: 2000,
              });
            }
          );
        }
      },
      error => {
        this._snackBar.open("Hubo un Error a todas las categorias hijas", "", {
          duration: 2000,
        });
      }
    );
    
    this.productService.get_all_prod_by_categoria(this.id_selected).subscribe(
      (productos: Producto[]) => {

        for(var j = 0 ; j < productos.length ; j++)
        {
          this.productos.push(productos[j]);
        }
        this.changeDetectorRefs.detectChanges();
      },
      error => {
        this._snackBar.open("Hubo un Error al Obtener los productos con un tipo de categoria", "", {
          duration: 2000,
        });
      }
    );
  }

  get_all_products()
  {
    this.productService.get_all_products().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
        this.changeDetectorRefs.detectChanges();
      },
      error => {
        this._snackBar.open("Hubo un Error al Obtener todos los productos", "", {
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
        this._snackBar.open("Hubo un Error al Obtener las categorias hijas", "", {
          duration: 2000,
        });
      }
    );
  }

  getnode(node: Arbol) {
    this.id_selected = node.id;
    this.get_products_by_category();
  }

  bydate()
  {
    this.productos.sort(function(a, b){
      var datePartsa = a.REGISTER_DATE.split("/");
      var datePartsb = b.REGISTER_DATE.split("/");
      var dateA=new Date(datePartsa[1] + "/" + datePartsa[0] + "/" + datePartsa[2]), dateB=new Date(datePartsb[1] + "/" + datePartsb[0] + "/" + datePartsb[2])
      return dateA.getDate() - dateB.getDate(); //sort by date ascending
    });

    if(this.isChecked == false)
    {
      this.productos = this.productos.reverse();
    }
  }

  byfeedback()
  {

  }

  byprice()
  {
    if(this.isChecked == true)
    {
      this.productos.sort(function (o1,o2) {
        if (o1.PRICE > o2.PRICE) { //comparación lexicogŕafica
          return 1;
        } else if (o1.PRICE < o2.PRICE) {
          return -1;
        } 
        return 0;
      });
    }else 
    {
      this.productos.sort(function (o1,o2) {
        if (o1.PRICE < o2.PRICE) { //comparación lexicogŕafica
          return 1;
        } else if (o1.PRICE > o2.PRICE) {
          return -1;
        } 
        return 0;
      });
    }
  }

  buscar() {
    this.productos = [];
    if(this.busqueda != null)
    {
      this.productService.product_search(this.busqueda).subscribe(
        (productos: Producto[]) => {
  
          this.productos = productos;
          this.changeDetectorRefs.detectChanges();
        },
        error => {
          this._snackBar.open("Hubo un Error al Realizar la busqueda", "", {
            duration: 2000,
          });
        }
      );
    }
  }
  
  agregar_carrito(producto: Producto)
  {
    if ((localStorage.getItem("id") == null)) 
    {
      this._snackBar.open("Para poder comprar necesita hacer login", "", {
        duration: 2000,
      });
    }else{
      if(this.cantidad > 0 && this.cantidad < producto.AVAILABLE_NUMBER)
      {
        this.productService.insertar_carrito(parseInt(localStorage.getItem("id")), producto.PRODUCT_ID, this.cantidad, producto.PRICE).subscribe(
          res => {
            this._snackBar.open("Se agrego al carrito", "", {
              duration: 2000,
            });
            producto.AVAILABLE_NUMBER = producto.AVAILABLE_NUMBER - this.cantidad;
            this.cantidad = 0;
          },
          error => {
            this._snackBar.open("Hubo un Error al Agregar al carrito", "", {
              duration: 2000,
            });
          }
        );
      }else 
      {
        this._snackBar.open("La cantidad para agregar al carrito es incorrecta", "", {
          duration: 2000,
        });
      }
    }
  }

  see_product(producto : Producto)
  {
    const dialogRef = this.dialog.open(ViewProductComponent, {
      width: '800px',
      data: producto
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }
}
