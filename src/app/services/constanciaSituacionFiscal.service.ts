import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConstanciaSituacionFiscalConstante } from '../config/constantes';

@Injectable({
  providedIn: 'root'
})
export class ConstanciaSituacionFiscalService {

  constructor(private _constantes: ConstanciaSituacionFiscalConstante, private _apiServicio: ApiService ) { }

  cargarCSF(CSF: any){
    return this._apiServicio.uploadFile( CSF, this._constantes.URLCargaCSF);    
  }

}
