import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Categoria } from 'src/app/models/categoria';
import { Arbol } from 'src/app/models/arbol';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, ErrorStateMatcher, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ArchivoService } from 'src/app/services/archivo.service';
import { productService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

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


  clear() {
    this.nombre_categoria = "Ninguno";
    this.id_selected = -1;
    this.producto.CATEGORY_ID = this.previos_parent;
  }
}
