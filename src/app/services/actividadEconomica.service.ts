import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ActividadEconomicaConstante } from '../config/constantes';

@Injectable({
    providedIn: 'root'
  })
  export class ActividadEconomicaService {
  
    constructor(private _constantes: ActividadEconomicaConstante, private _apiServicio: ApiService ) { }
  
    // obtenerAllContribuyentes(){
    //   return this._apiServicio.Get( this._constantes.URLObtenerAllContribuyentes );    
    // }
  
    obtenerContribuyenteActividadEconomica(IdContribuyente: any){
      return this._apiServicio.Get( this._constantes.URLObtenerLstActividadContribuyente  + '?id=' + IdContribuyente );    
    }
  
    // crearContribuyente(CSF: any){
    //   return this._apiServicio.uploadFile(CSF, this._constantes.URLCrearContribuyente);    
    // }
  
    // eliminarContribuyente(id: number){
    //   return this._apiServicio.Delete(id, this._constantes.URLEliminarContribuyente);    
    // }
  
  }
  