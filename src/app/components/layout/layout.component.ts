import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuAPI } from 'src/app/Interfaces/menu-api';
import { MenuService } from 'src/app/services';
import { UtilidadService } from 'src/app/shared/utilidad.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{
  listaMenus: MenuAPI[] = [];
  email: string = '';
  rolUsuario: string = '';

  constructor(
    private router: Router,
    private menuService: MenuService,
    private utilidad: UtilidadService,
  ){}

  ngOnInit(): void {
    const usuario = this.utilidad.obtenerSesionUsuario();

    if(usuario != null){
      this.email = usuario.email;
      this.rolUsuario = usuario.rolUsuario;

      this.menuService.lista(usuario.idUsuario).subscribe({
        next: (data)=>{
          if(data.estatus)this.listaMenus = data.value;
        },
        error: (error) => {

        }
      });
    }
  }

  cerrarSesion(){
    this.utilidad.eliminarSesionUsuario();
    this.router.navigate(['login']);
  }
  

}
