import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroupDirective, FormControl, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Categoria } from 'src/app/models/categoria';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Arbol } from 'src/app/models/arbol';
import { NestedTreeControl } from '@angular/cdk/tree';
import { CreateCategoryComponent } from '../create-category/create-category.component';

export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-crud-category',
  templateUrl: './crud-category.component.html',
  styleUrls: ['./crud-category.component.scss']
})

export class CrudCategoryComponent implements OnInit {

  match = new ErrorMatcher();
  categoria : Categoria;
  TREE_DATA: Arbol[] = [];
  nombre_categoria: string = "Ninguno";
  id_selected: number = -1;

  displayedColumns: string[] = ['CATEGORY_ID', 'CATEGORY_NAME', 'CATEGORY_PARENT', 'PARENT', 'actions'];
  ELEMENT_DATA: Categoria[];

  constructor(private changeDetectorRefs: ChangeDetectorRef, private categoryService: CategoryService,
  public dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router) { this.dataSource.data = this.TREE_DATA }

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
    this.refresh();
    this.categoria = new Categoria();
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

  create() {
    if(this.id_selected > 0)
    
      this.categoria.CATEGORY_PARENT_NA = this.nombre_categoria;
    else
      this.categoria.CATEGORY_PARENT_NA = null;

    if(this.categoria.DESCRIPCION == "")
      this.categoria.DESCRIPCION = null;

    this.categoryService.postCategoria(this.categoria).subscribe(
      res => {
        this._snackBar.open("Se Creo Correctamente la categoria.", "", {
          duration: 2000,
        });
        this.refresh();
      },
      error => {
        this._snackBar.open("Hubo un Error al Crear el Usuario.", "", {
          duration: 2000,
        });
      }
    );
    }

  clear() {
    this.nombre_categoria = "Ninguno";
    this.id_selected = -1;
    this.categoria = new Categoria();
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
  
  getnode(node: Arbol) {
    this.nombre_categoria = node.name;
    this.id_selected = node.id;
  }

  edit(row: any): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '500px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  delete(row: any) {
    this.categoryService.deleteCategoria(row).subscribe(
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
  }

}