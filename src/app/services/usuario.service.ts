import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { UsuarioConstante } from "./../config/constantes";
import { UsuarioAPI } from '../Interfaces/usuario-api';
import { LoginAPI } from '../Interfaces/login-api';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../Interfaces/response-api';

@Injectable()
export class UsuarioService {
	constructor(
		private _usuarioConstante: UsuarioConstante,
		private _apiServicio: ApiService,
	) {	}
	
	iniciarSesion(request:LoginAPI):Observable<ResponseAPI>{
		return this._apiServicio.ResponsePost(request,this._usuarioConstante.URLIniciarSesion);
	}

	lista(request: UsuarioAPI):Observable<ResponseAPI> {
		return this._apiServicio.ResponseGet(this._usuarioConstante.URLListar);
	}
	
	guardar(request: UsuarioAPI):Observable<ResponseAPI> {
		return this._apiServicio.ResponsePost(request,this._usuarioConstante.URLGuardar);
	}

	editar(request: UsuarioAPI):Observable<ResponseAPI> {
		return this._apiServicio.ResponsePut(request, this._usuarioConstante.URLEditar);
	}
	
	eliminar(id: number):Observable<ResponseAPI> {
		return this._apiServicio.ResponsePut(id, this._usuarioConstante.URLEditar);
	}
}
