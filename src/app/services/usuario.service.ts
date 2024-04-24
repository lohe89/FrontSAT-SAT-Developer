import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { UsuarioConstante } from "./../config/constantes";

@Injectable()
export class UsuarioService {
	constructor(
		private _usuarioConstante: UsuarioConstante,
		private _apiServicio: ApiService,
	) {	}
	
	ObtenerUsuarios() {
		return this._apiServicio.Get(this._usuarioConstante.URLUsuarios);
	}
	
	ObtenerUsuarioPorID(UsuarioID: number) {
		return this._apiServicio.Get(this._usuarioConstante.URLObtenerUsuariosID);
	}

	ActualizarPassword(usuario: any) {
		return this._apiServicio.Post(usuario, this._usuarioConstante.URLActualizarPassword);
	}

	ResetearPassword(usuario: any) {
		return this._apiServicio.Post(usuario, this._usuarioConstante.URLResetearPassword);
	}

	ActualizarUsuario(usuario: any) {
		return this._apiServicio.Post(usuario, this._usuarioConstante.URLActualizaUsuario);
	}

	ActualizaPassSin(datos: any) {
		return this._apiServicio.Post(datos, this._usuarioConstante.URLObtenerUsuarioSinActualizaPassword);
	}

}
