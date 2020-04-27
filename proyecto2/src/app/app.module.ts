import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatBottomSheetModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CrudUserComponent } from './components/crud-user/crud-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { InformationComponent } from './components/information/information.component';
import { AdmindatosComponent } from './components/admindatos/admindatos.component';
import { DenegadoComponent } from './components/denegado/denegado.component';
import { VerificarComponent } from './components/verificar/verificar.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CrudProductosComponent } from './components/crud-productos/crud-productos.component';
import { CrudCategoryComponent } from './components/crud-category/crud-category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CrudTiendaComponent } from './components/crud-tienda/crud-tienda.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { CreateFacturaComponent } from './components/create-factura/create-factura.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CrudUserComponent,
    CreateUserComponent,
    InformationComponent,
    AdmindatosComponent,
    DenegadoComponent,
    VerificarComponent,
    ReportesComponent,
    CrudProductosComponent,
    CrudCategoryComponent,
    CreateCategoryComponent,
    CreateProductComponent,
    CrudTiendaComponent,
    ViewProductComponent,
    CreateFacturaComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatTreeModule,
    AppRoutingModule,
    MatBottomSheetModule,
    MatListModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
    MatRadioModule,
    MatSlideToggleModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, CreateUserComponent, CreateCategoryComponent, CreateProductComponent, ViewProductComponent, CreateFacturaComponent, ReportesComponent]
})
export class AppModule { }
