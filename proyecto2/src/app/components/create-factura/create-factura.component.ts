import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { productService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-factura',
  templateUrl: './create-factura.component.html',
  styleUrls: ['./create-factura.component.scss']
})
export class CreateFacturaComponent implements OnInit {

  constructor(private router: Router, private productService: productService, private changeDetectorRefs: ChangeDetectorRef,
    private _snackBar: MatSnackBar) { }

  ELEMENT_DATA: any[];
  displayedColumns: string[] = ['Nombre', 'Precio', 'Cantidad', 'Total', 'actions'];
  total:number = 0;


  ngOnInit(): void {

    let ses = localStorage.getItem("tipo");
    if (ses) {
      if (!(localStorage.getItem("tipo") == 'Administrador') && !(localStorage.getItem("tipo") == 'Server') && !(localStorage.getItem("tipo") == 'Client')) {
        this.router.navigate(['denegado']);
      }
    }else {
      this.router.navigate(['denegado']);
    }
    this.refresh();
  }

  refresh() {
    this.ELEMENT_DATA = [];

    this.productService.get_products_cart(parseInt(localStorage.getItem("id"))).subscribe(
      (products: any[]) => {
        this.ELEMENT_DATA = products;
        for(var i = 0 ; i < this.ELEMENT_DATA.length ; i++)
        {
          this.total += products[0].NUMBER_PRODUCT*products[i].PRICE;
        }
        this.changeDetectorRefs.detectChanges();
      },
      error => {
        this._snackBar.open("Hubo un Error al Obtener los Usuarios del Sistema", "", {
          duration: 2000,
        });
      }
    );
  }

  delete(producto: any)
  {
    this.productService.eliminar_producto_cart(parseInt(localStorage.getItem("id")), producto.PRODUCT_ID, producto.NUMBER_PRODUCT, producto.PRICE).subscribe(
      res => {
        this._snackBar.open("Se elimino el producto del carrito", "", {
          duration: 2000,
        });
        this.refresh();
      },
      error => {
        this._snackBar.open("Hubo un Error al eliminar el producto", "", {
          duration: 2000,
        });
      }
    );
  }
  pagar()
  {
    if(this.ELEMENT_DATA.length > 0)
    {
      this.productService.insertar_factura(parseInt(localStorage.getItem("id"))).subscribe(
        res => {
          this._snackBar.open("Se creo la Nueva factura", "", {
            duration: 2000,
          });
          
          for(var i = 0 ; i < this.ELEMENT_DATA.length ; i++)
          {
            this.productService.insertar_factura_product(parseInt(localStorage.getItem("id")), this.ELEMENT_DATA[i].PRODUCT_ID, this.ELEMENT_DATA[i].NUMBER_PRODUCT, this.ELEMENT_DATA[i].PRICE).subscribe(
              res => {
                this._snackBar.open("Se Agrego un nuevo producto a la factura", "", {
                  duration: 2000,
                });
                this.refresh();
                this.total = 0;
              },
              error => {
                this._snackBar.open("Hubo un Error al agregar el pŕoducto a la factura", "", {
                  duration: 2000,
                });
              }
            );
          }
        },
        error => {
          this._snackBar.open("Hubo un Error al eliminar el producto", "", {
            duration: 2000,
          });
        }
      );
    }
  }

}
