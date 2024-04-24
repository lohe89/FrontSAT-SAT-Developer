import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from "./api.service";
import { FormularioConstante } from "./../config/constantes";

@Injectable()
export class MenuService {

    currentUser: any = {};
    todos: Observable<any[]>
    private _todos: BehaviorSubject<any[]>;
    private dataStore: {
        todos: any[]
    };
    constructor(
		private _formularioConstante: FormularioConstante,
		private _apiServicio: ApiService) {
        this.dataStore = { todos: [] };
        this._todos = <BehaviorSubject<any[]>><unknown>new BehaviorSubject([]);
        this.todos = this._todos.asObservable();
    }

    obtenerMenu(GrupoID: any) {
        return this._apiServicio.Get(this._formularioConstante.URLMenuSubmenuPorGrupo + GrupoID);
    }

    obtenerMenuPorGrupo(GrupoID: any) {
        return this._apiServicio.Get(this._formularioConstante.URLMenuSubmenuPermisosPorGrupo + GrupoID);
    }
    obtenerMenuPorPosicionGrupo(GrupoID: any, PosicionID: any) {
        return this._apiServicio.Get(this._formularioConstante.URLMenuSubmenuPermisosPorPosicionGrupo + '?GrupoID=' + GrupoID + '&PosicionID=' + PosicionID);
    }
}
