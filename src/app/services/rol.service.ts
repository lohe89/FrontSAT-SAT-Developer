import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { RolConstante } from "./../config/constantes";
import { Observable } from 'rxjs';
import { ResponseAPI } from '../Interfaces/response-api';
import { RolAPI } from '../Interfaces/rol-api';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(
    private _rolConstante: RolConstante,
		private _apiServicio: ApiService,
  ) { }

  lista(request: RolAPI):Observable<ResponseAPI> {
		return this._apiServicio.ResponseGet(this._rolConstante.URLListar);
	}

}
