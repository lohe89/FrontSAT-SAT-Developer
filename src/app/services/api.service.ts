import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http';
// import { CookieService } from 'ngx-cookie-service';

//Constantes
import { ConfiguracionConstante } from '../config/constantes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    public http: HttpClient,
    private _constante : ConfiguracionConstante
  ) { }

  Delete(objeto: any, ruta: string) {
    return this.http.delete(this._constante.API_ENDPOINT + ruta + objeto, { headers: this.Cabeceros() });
  }

  Put(objeto: any, ruta: string) {
    return this.http.put(this._constante.API_ENDPOINT + ruta, objeto, { headers: this.Cabeceros() });
  }

  Post(objeto: any, ruta: string) {
    return this.http.post(this._constante.API_ENDPOINT + ruta, objeto, { headers: this.Cabeceros() });
  }

  Get(ruta: string, parametros: HttpParams = new HttpParams()) {
    return this.http.get(this._constante.API_ENDPOINT + ruta, {
      // return this.http.get(ruta, {
      headers: this.Cabeceros(),
      params: parametros,
      responseType: 'json'
    });
  }

  Upload(objeto: any, ruta: string) {
    return this.http.post(this._constante.API_ENDPOINT + ruta, objeto, { headers: this.Cabecerosarchivo() });
  }

  private Cabeceros() {
    // let currentUser = (this._cockieService.get('session')) ? JSON.parse(this._cockieService.get('session')) : null;
    // if (currentUser && currentUser.token) {
		return new HttpHeaders({
			'Content-Type':  'application/json',
			// 'Authorization': 'Bearer ' + currentUser.token 
		});
    // }
  }

  private Cabecerosarchivo() {
    // let currentUser = (this._cockieService.get('session')) ? JSON.parse(this._cockieService.get('session')) : null;
    // if (currentUser && currentUser.token) {
		return new HttpHeaders({
      'Content-Type':  'application/pdf',
      // 'Authorization': 'Bearer ' + currentUser.token
		});
    // }
  }

  PostArchivos(objeto: any, ruta: string) {
    return this.http.post(this._constante.API_ENDPOINT + ruta, objeto, { headers: this.CabecerosMultiplesArchivos() });
  }

  private CabecerosMultiplesArchivos() {
    // let currentUser = (this._cockieService.get('session')) ? JSON.parse(this._cockieService.get('session')) : null;
    // if (currentUser && currentUser.token) {
		return new HttpHeaders({
      'Content-Type':  'undefined',
      // 'Authorization': 'Bearer ' + currentUser.token
		});
    // }
  }

  uploadFile(formData: FormData, ruta: string):Observable<any>{
    return this.http.post(this._constante.API_ENDPOINT + ruta, formData)
  }

}
