import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CrudUserComponent } from './components/crud-user/crud-user.component';
import { InformationComponent } from './components/information/information.component';
import { AdmindatosComponent } from './components/admindatos/admindatos.component';
import { DenegadoComponent } from './components/denegado/denegado.component';
import { VerificarComponent } from './components/verificar/verificar.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CrudCategoryComponent } from './components/crud-category/crud-category.component';
import { CrudProductosComponent } from './components/crud-productos/crud-productos.component';

const routes: Routes = [
  //{ path: '' , component: LoginComponent },
  { path: 'inicio' , component: HomeComponent },
  { path: 'users' , component: CrudUserComponent },
  { path: 'datos' , component: AdmindatosComponent },
  { path: 'denegado' , component: DenegadoComponent },
  { path: 'products' , component: CrudProductosComponent },
  { path: 'categorias' , component: CrudCategoryComponent },
  { path: 'verificar' , component: VerificarComponent },
  { path: 'reportes' , component: ReportesComponent },
  { path: '' , component: InformationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
