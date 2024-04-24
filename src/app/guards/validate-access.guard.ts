import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MenuService } from '../services';
import { Menu, Formulario, Modulo } from '../layout/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class ValidateAccessGuard implements CanActivate {


  constructor(private router: Router, private __menuService: MenuService, private __coockieService: CookieService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let flagAcceso = await this.getRutasAccesibles(state);

    if (!flagAcceso) {
      this.router.navigate(['/tablero'], { queryParams: {} });
    }

    return flagAcceso;
  }

  parseValidator(cookie: string) {
    return (this.__coockieService.get(cookie)) ? JSON.parse(this.__coockieService.get(cookie)) : null;
  }

  async getRutasAccesibles(state: RouterStateSnapshot) {

    let { url } = state;
    let permiteAcceder: boolean;
    let { PosicionID } = this.parseValidator('puesto');
    let { user: { GrupoID } } = this.parseValidator('session');

    let promise = new Promise<boolean>((resolve) => {
      this.__menuService.obtenerMenu(GrupoID).subscribe((data: any) => {
        this.__menuService.obtenerMenuPorPosicionGrupo(GrupoID, PosicionID).subscribe((permisos: any) => {

          let menus = this.MezclarPermisos(permisos, data.formularios);
          let validarAcceso = false;

          // for (let i = 0; i < menus.length; i++) {
            // if (menus[i].Formulario.Ruta.includes(url.substring(1, url.length))) {
            //   validarAcceso = true;
            //   break;
            // }
          // }
          resolve(validarAcceso);
        }, err => {
          console.error(err);
          resolve(true);
        });
      }, err => {
        console.error(err);
        resolve(true);
      });

    });

    permiteAcceder = await promise;
    return permiteAcceder;
  }


  MezclarPermisos(permisosIndividuales: any, menus: any) {
    var nuevoMenu: Menu[] = [];
    var ordenNuevoMenu: Menu[] = [];
    nuevoMenu = menus;
    var opcionGrupo: Menu;
    var formulario: Formulario;
    var modulo: Modulo;

    permisosIndividuales.Permisos.filter((p: any) => p.AccesoPorGrupo == 0 && p.Escritura == 1).forEach((f:any) => {
      opcionGrupo = new Menu;
      formulario = new Formulario;
      modulo = new Modulo;

      if (!(nuevoMenu.filter(c => c.FormularioID == f.FormularioID).length > 0)) {
        opcionGrupo.Formulario = new Formulario;
        opcionGrupo.GrupoID = 0;
        modulo.Activo = true;
        modulo.Descripcion = f.Modulo;
        modulo.ModuloID = f.ModuloID;
        modulo.imagen = f.Imagen;


        formulario.Activo = true;
        formulario.Descripcion = f.DescripcionFormulario;
        formulario.FormularioID = f.FormularioID;
        formulario.Imagen = f.Imagen;
        formulario.ModuloID = f.ModuloID;
        formulario.Modulo = modulo;
        formulario.PadreID = 0;
        formulario.Ruta = f.Ruta;
        formulario.Tipo = f.Tipo;
        formulario.Orden = f.Orden;

        opcionGrupo.Formulario = formulario;
        nuevoMenu.push(opcionGrupo);
      }
    });
  }

}
