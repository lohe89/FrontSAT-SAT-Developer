import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { MenuConstante } from "./../config/constantes";
import { Observable } from 'rxjs';
import { ResponseAPI } from '../Interfaces/response-api';
import { MenuAPI } from '../Interfaces/menu-api';

@Injectable()
export class MenuService {

    constructor(
        private _menuConstante: MenuConstante,
            private _apiServicio: ApiService,
      ) { }
    
      lista(idUsuario: number):Observable<ResponseAPI> {
            return this._apiServicio.ResponseGetId(idUsuario ,this._menuConstante.URLListar);
        }
}
