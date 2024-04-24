import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthenticationService {
  currentUser: any = {};

  constructor(
    private _coockieService: CookieService,
    private _loginService: LoginService) {
  }

  Login(username: string, password: string) {
    let usuario = { usuario: username, password: password };
    return this._loginService.Login(usuario);
  }

  CerrarSesion() {
    this._coockieService.deleteAll();
  }
}