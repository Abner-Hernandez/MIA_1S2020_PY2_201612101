import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule, MatCardModule, MatProgressSpinnerModule, MatFormFieldModule, MatMenuModule, MatTableModule, MatDialogModule, MatSnackBarModule, MatTabsModule, MatGridListModule, MatNativeDateModule, MatTreeModule, MatBottomSheetModule, MatListModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatExpansionModule, MatPaginatorModule } from '@angular/material';
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
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, CreateUserComponent, CreateCategoryComponent, CreateProductComponent]
})
export class AppModule { }
