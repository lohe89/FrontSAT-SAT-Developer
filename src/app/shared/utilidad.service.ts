import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SesionAPI } from '../Interfaces/sesion-api';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(
    private _snackbar: MatSnackBar
  ) { }

  mostrarAlerta(msg: string, tipo:string){
    this._snackbar.open(msg, tipo,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    })
  }

  guardarSesionUsuario(usuarioSesion:SesionAPI){
    localStorage.setItem("usuario",JSON.stringify(usuarioSesion));
  }

  obtenerSesionUsuario(){
    const dataCadena = localStorage.getItem("usuario");
    const usuario = JSON.parse(dataCadena!);
    return usuario
  }

  eliminarSesionUsuario(){
    localStorage.removeItem("usuario");
  }

}
