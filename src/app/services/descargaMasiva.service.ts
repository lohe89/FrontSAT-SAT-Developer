import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DescargaMasivaConstante } from '../config/constantes';

@Injectable({
  providedIn: 'root'
})
export class DescargaMasivaService {

  constructor(private _constantes: DescargaMasivaConstante, private _apiServicio: ApiService ) { }

  descargaMasivaXML(id: any, fechaInicio: string, fechaFin: string){
    return this._apiServicio.Get( this._constantes.URLDescargaMasiva + '?id=' + id + '&fechaInicio=' + fechaInicio + '&fechaFin=' + fechaFin );    
  }

  validarSolicitud(idSoicitud: any,idContribuyente: any){
    return this._apiServicio.Get( this._constantes.URLValidarSolicitud + '?idSoicitud=' + idSoicitud + '&idContribuyente=' + idContribuyente);    
  }

  solicitudesContribuyente(idContribuyente: any){
    return this._apiServicio.Get( this._constantes.URLSolicitudesContribuyente + '?idContribuyente=' + idContribuyente);    
  }

}
