import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ContribuyenteConstante } from '../config/constantes';

@Injectable({
  providedIn: 'root'
})
export class ContribuyenteService {

  constructor(private _constantes: ContribuyenteConstante, private _apiServicio: ApiService ) { }

  obtenerAllContribuyentes(){
    return this._apiServicio.Get( this._constantes.URLObtenerAllContribuyentes );    
  }

  obtenerContribuyenteId(IdContribuyente: any){
    return this._apiServicio.Get( this._constantes.URLObtenerContribuyenteId + '?id=' + IdContribuyente );    
  }

  crearContribuyente(CSF: any){
    return this._apiServicio.uploadFile(CSF, this._constantes.URLCrearContribuyente);    
  }

  eliminarContribuyente(id: number){
    return this._apiServicio.Delete(id, this._constantes.URLEliminarContribuyente);    
  }

}
