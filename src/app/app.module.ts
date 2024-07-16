import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { matFormFieldAnimations, MatFormFieldModule } from '@angular/material/form-field';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { UserShowComponent } from './user-show/user-show.component';
import { FillDetailsDialogComponent } from './fill-details-dialog/fill-details-dialog.component';
import { CustomInputSComponent } from './custom-input-s/custom-input-s.component';
import { FormComponent } from './form/form.component';
import { BlurHandlerDirective } from './blur-handle.directive';
import { GridComponent } from './grid/grid.component';
import { HttpClientModule } from '@angular/common/http';
import { TableGridComponent } from './table-grid/table-grid.component';
import { ScrollableComponent } from './scrollable/scrollable.component';
import { HttpGridComponent } from './http-grid/http-grid.component';
import { CustomDataTableComponent } from './custom-data-table/custom-data-table.component';
import { CustomDataTabelComponent } from './custom-data-tabel/custom-data-tabel.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    CustomInputComponent,
    UserShowComponent,
    FillDetailsDialogComponent,
    CustomInputSComponent,
    FormComponent,
    BlurHandlerDirective,
    GridComponent,
    TableGridComponent,
    ScrollableComponent,
    HttpGridComponent,
    CustomDataTableComponent,
    CustomDataTabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
