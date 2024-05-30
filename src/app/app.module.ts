import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ContribuyentesModule } from './components/contribuyentes/contribuyentes/contribuyentes.module';
import { LoginModule } from './components/login/login.module';
import { LayoutModule } from './components/layout/layout.module';

//Constantes
import {
  ConfiguracionConstante,
  ContribuyenteConstante,
  ConstanciaSituacionFiscalConstante,
  LoginConstante,
  UsuarioConstante,
  FormularioConstante,
  ActividadEconomicaConstante,
  RegimenFiscalConstante,
  DescargaMasivaConstante
} from './config/constantes';

//Servicios
import {
  ApiService,
  ContribuyenteService,
  ConstanciaSituacionFiscalService,
  LoginService,
  AuthenticationService,
  MenuService,
  UsuarioService,
  ActividadEconomicaService,
  RegimenFiscalService,
  DescargaMasivaService
} from './services';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';


const APP_CONSTANTES = [
  ConfiguracionConstante,
  ContribuyenteConstante,
  ConstanciaSituacionFiscalConstante,
  LoginConstante,
  UsuarioConstante,
  FormularioConstante,
  ActividadEconomicaConstante,
  RegimenFiscalConstante,
  DescargaMasivaConstante
];

const APP_SERVICIOS = [
  ApiService,
  ContribuyenteService,
  ConstanciaSituacionFiscalService,
  LoginService,
  AuthenticationService,
  MenuService,
  UsuarioService,
  ActividadEconomicaService,
  RegimenFiscalService,
  DescargaMasivaService
];

const APP_MODULOS = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  // RoutesModule,
  BrowserAnimationsModule,
  
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ...APP_MODULOS,
    SharedModule.forRoot(),    
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    LayoutModule,
    ContribuyentesModule,
    LoginModule
  ],
  providers: [
    ...APP_CONSTANTES,
    ...APP_SERVICIOS
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
