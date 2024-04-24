import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RegimenFiscalConstante } from '../config/constantes';

@Injectable({
    providedIn: 'root'
  })
  export class RegimenFiscalService {
  
    constructor(private _constantes: RegimenFiscalConstante, private _apiServicio: ApiService ) { }
  
    // obtenerAllContribuyentes(){
    //   return this._apiServicio.Get( this._constantes.URLObtenerAllContribuyentes );    
    // }
  
    obtenerContribuyenteRegimenFiscalId(IdContribuyente: any){
      return this._apiServicio.Get( this._constantes.URLObtenerLstRegimenContribuyente + '?id=' + IdContribuyente  );    
    }
  
    // crearContribuyente(CSF: any){
    //   return this._apiServicio.uploadFile(CSF, this._constantes.URLCrearContribuyente);    
    // }
  
    // eliminarContribuyente(id: number){
    //   return this._apiServicio.Delete(id, this._constantes.URLEliminarContribuyente);    
    // }
  
  }
  