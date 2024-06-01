import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { LoginConstante } from "./../config/constantes";


@Injectable()
export class LoginService {
	constructor(
		private _loginConstante: LoginConstante,
		private _apiServicio: ApiService) {
    }

    Login(usuario: any) {
        return this._apiServicio.Post(usuario, this._loginConstante.URLLogin);
    }
	
	OlvidePassword(usuario: any){
		return usuario;
	}
}