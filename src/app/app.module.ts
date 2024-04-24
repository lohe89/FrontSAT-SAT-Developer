import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RoutesModule } from './components/routes.module';
import { SharedModule } from './shared/shared.module';
import { ContribuyentesModule } from './components/contribuyentes/contribuyentes/contribuyentes.module';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './components/login/login.module';
import { AuthGuard } from './guards/Auth.guard';
import { CoreModule } from './core/core.module';

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
  RoutesModule,
  BrowserAnimationsModule,
  LayoutModule,
  CoreModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...APP_MODULOS,
    ToolbarComponent,
    SharedModule.forRoot(),
    ContribuyentesModule,
    LoginModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    ...APP_CONSTANTES,
    ...APP_SERVICIOS
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
