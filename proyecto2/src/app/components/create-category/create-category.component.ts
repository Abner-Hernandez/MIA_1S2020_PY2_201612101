import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Arbol } from 'src/app/models/arbol';

export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  user: User;
  editar: boolean = false;
  registrar: boolean = false;
  TREE_DATA: Arbol[] = [];
  ELEMENT_DATA: Categoria[];
  nombre_categoria: string = "Ninguno";
  previos_name: string = "";
  previos_parent: number ;
  id_selected: number = -1;

  constructor(private categoriaService: CategoryService, private changeDetectorRefs: ChangeDetectorRef,private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public categoria: Categoria, private router: Router) {this.dataSource.data = this.TREE_DATA }

    treeControl = new NestedTreeControl<Arbol>(node => node.children);
    dataSource = new MatTreeNestedDataSource<Arbol>();
  
    hasChild = (_: number, node: Arbol) => !!node.children && node.children.length > 0;

  ngOnInit() {
    if(this.categoria.CATEGORY_NAME == ""){
      this.registrar = true;
      this.editar = false;
    }else{
      this.registrar = false;
      this.editar = true;
    }
    let ses = localStorage.getItem("tipo");
    if (ses) {
      if (this.editar == true && localStorage.getItem("tipo") != 'Administrador') {
        this.router.navigate(['denegado']);
      }
    }else {
      if(this.registrar == false){
        this.router.navigate(['denegado']);
      }
    }
    this.refresh();
    this.get_parent();
    this.previos_name = this.categoria.CATEGORY_NAME;
    this.previos_parent = this.categoria.CATEGORY_PARENT;
  }

  refresh() {
    this.TREE_DATA = [];
    this.categoriaService.categorias().subscribe(
      (usersByAPI: Categoria[]) => {
        this.ELEMENT_DATA = usersByAPI;
        this.createTree();
        this.changeDetectorRefs.detectChanges();
      },
      error => {
        this._snackBar.open("Hubo un Error al Obtener los Usuarios del Sistema", "", {
          duration: 2000,
        });
      }
    );
  }

  createTree(){

    this.categoriaService.categorias_padres().subscribe(
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
    this.categoriaService.posthijas(id_parent).subscribe(
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
        this._snackBar.open("Hubo un Error al Obtener la informacion de la categoria", "", {
          duration: 2000,
        });
      }
    );
  }

  register() {
    //no hay registro es para editar
  }

  edit(){
    if(this.id_selected > 0)
      this.categoria.CATEGORY_PARENT = this.id_selected;

    this.categoriaService.update(this.categoria).subscribe(
      res => {
        this._snackBar.open("Se Actualizo correctamente la categoria.", "", {
          duration: 2000,
        });
      },
      error => {
        this._snackBar.open("Hubo un Error al actualizar la categoria.", "", {
          duration: 2000,
        });
      }
    );
  }

  get_parent(){
    if(this.categoria.CATEGORY_PARENT == null)
      return;
    var aux: Categoria = new Categoria();
    aux.CATEGORY_ID = this.categoria.CATEGORY_PARENT;
    this.categoriaService.get_data_by_id(aux).subscribe(
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

  getnode(node: Arbol) {
    this.nombre_categoria = node.name;
    this.id_selected = node.id;
  }

  clear() {
    this.nombre_categoria = "Ninguno";
    this.id_selected = -1;
    this.categoria.CATEGORY_NAME = this.previos_name;
    this.categoria.CATEGORY_PARENT = this.previos_parent;
  }

}
