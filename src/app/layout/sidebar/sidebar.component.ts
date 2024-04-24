import { Component, OnInit, ViewChild, Injector, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
import { CookieService } from 'ngx-cookie-service';
import { MenuService as MenuServiceCore } from '../../core/menu/menu.service';
import { SettingsService } from '../../core/settings/settings.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MenuService, UsuarioService, } from '../../services';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

    menuItems?: Array<any>;
    router?: Router;
    sbclickEvent = 'click.sidebar-toggle';
    $doc: any = null;

    DIA: number = 86400000;
    colaboradoresSelect: any[] = [];
    numeroEmpleadoColaborador: any;
    todos: Observable<any[]>;
    EsJefe: boolean = false;
    MostrarRegresar: boolean = false;
    private _todos: BehaviorSubject<any[]>;
	private dataStore: {
        todos: any[]
    };

    constructor(
        private __router: Router, 
        private __menuService: MenuService, 
        private __cockieService: CookieService, 
        private _usuarioService: UsuarioService, 
        public menu: MenuServiceCore, 
        public settings: SettingsService, 
        public injector: Injector,
        ) {
        
        // this.reloadMenu()
		this.dataStore = { todos: [] };
        this._todos = <BehaviorSubject<any[]>><unknown>new BehaviorSubject([]);
        this.todos = this._todos.asObservable();
    }

    public grupoRegistrado(grupo: any, menu:any)
    {
        var encontrado = false; 
        menu.forEach((element: any) => {
            if(grupo == element.text)
            {
                encontrado = true; 
            }
        });

        return encontrado;
    }

    public grupoRegistrado2(grupo: any, menu:any)
    {
        var encontrado = false; 
        menu.forEach((element:any) => {
            if(grupo == element.text)
            {
                encontrado = true; 
            }
        });

        return encontrado;
    }

    comparaModulos(a: any, b:any) {
        return a.Formulario.ModuloID - b.Formulario.ModuloID;
      }

    MezclarPermisos(permisosIndividuales: any, menus: any)
    {
        var nuevoMenu : Menu[] = [];
        var ordenNuevoMenu : Menu[] = [];
        nuevoMenu = menus;
        var opcionGrupo : Menu;
        var formulario: Formulario;
        var modulo: Modulo;
        console.log("slider");
        console.log(permisosIndividuales);
        
        permisosIndividuales.Permisos.filter((p:any) => p.AccesoPorGrupo == 0 && p.Escritura == 1).forEach((f:any) => {
            opcionGrupo = new Menu;
            formulario = new Formulario;
            modulo = new Modulo;

            if(  !(nuevoMenu.filter(c => c.FormularioID == f.FormularioID).length > 0 ) )
            {
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

        // ordenNuevoMenu = nuevoMenu.sort(function(a,b)
        // {
        //     if (a.Formulario.Orden > b.Formulario.Orden) {
        //         return 1;
        //       }
        //       if (a.Formulario.Orden < b.Formulario.Orden) {
        //         return -1;
        //       }
        //       // a must be equal to b
        //       return 0;
        // });

        // return ordenNuevoMenu.sort(function(a,b)
        // {
        //     if (a.Formulario.ModuloID > b.Formulario.ModuloID) {
        //         return 1;
        //       }
        //       if (a.Formulario.ModuloID < b.Formulario.ModuloID) {
        //         return -1;
        //       }
        //       // a must be equal to b
        //       return 0;
        // });
    }

    // public reloadMenu() {
    //     let session = (this.__cockieService.get('session')) ? JSON.parse(this.__cockieService.get('session')) : null;
    //     let otroMenu = (this.__cockieService.get('menuAlterno')) ? JSON.parse(this.__cockieService.get('menuAlterno')) : null;
    //     let grupoID = 0;
    //     let posicionID = 0;

        
    //     this._usuarioService.ObtenerEmpleado(session.user.NumeroEmpleado).subscribe((DatosEmpleado: any) => {
    //         posicionID = DatosEmpleado["usuarioID"][0]["nPosicion"];
        
    //         var  permisosIndividuales : any[] = [];
    //         if(otroMenu != null && otroMenu.GrupoID >= 0)
    //         {
    //             grupoID = otroMenu.GrupoID;
    //             posicionID = otroMenu.PosicionID;
    //         }
    //         else
    //         {
    //             grupoID = session.user.GrupoID;
    //         }

    //         this.__menuService.obtenerMenu(session.user.GrupoID).subscribe((data: any) => {
    //            // console.log(data);
    //             this.__menuService.obtenerMenuPorPosicionGrupo(grupoID, posicionID).subscribe((permisos: any) => {
    //                 let getMenu: Object[] = [];
    //                 let menus = this.MezclarPermisos(permisos, data.formularios)
    //                 //let menus = data.formularios;
    //                 for (let index = 0; index < menus.length; index++) {
                        
    //                     if(!this.grupoRegistrado(menus[index].Formulario.Modulo.Descripcion, getMenu))
    //                     {
    //                         if (index > 0) {
    //                             if (menus[index - 1].Formulario.Modulo.ModuloID != menus[index].Formulario.Modulo.ModuloID)
    //                                 getMenu.push({ text: menus[index].Formulario.Modulo.Descripcion, link: "", icon: menus[index].Imagen, Tipo: menus[index].Formulario.Tipo });
    //                         } else {
    //                             getMenu.push({ text: menus[index].Formulario.Modulo.Descripcion, link: "", icon: menus[index].Imagen, Tipo: menus[index].Formulario.Tipo });
    //                         }
    //                     }
    //                 }

    //                 for (let i = 0; i < getMenu.length; i++) {
    //                     (<any>getMenu[i]).submenu = [];
    //                     for (let j = 0; j < menus.length; j++) {
    //                         if (menus[j].Formulario.Modulo.Descripcion == (<any>getMenu[i]).text) {
    //                             if(!this.grupoRegistrado2(menus[j].Formulario.Descripcion, (<any>getMenu[i]).submenu)){
    //                                 (<any>getMenu[i]).submenu.push({ text: menus[j].Formulario.Descripcion, link: menus[j].Formulario.Ruta, icon: menus[j].Formulario.Imagen, Tipo: menus[j].Formulario.Tipo });
    //                             }
                            
    //                         }
    //                     }
    //                     if ((<any>getMenu[i]).submenu[0].text == null)
    //                         delete (<any>getMenu[i]).submenu;
    //                 }
                    
    //                 this.menuItems = getMenu;
                  
    //             });
    //         }, err => {
                
    //         });
    //     });
    // }

    ngOnInit() {
        this.router = this.injector.get(Router);
        this.router.events.subscribe((val) => {
            this.removeFloatingNav();
            window.scrollTo(0, 0);
            this.settings.layout.asideToggled = false;
        });
        this.anyClickClose();
        // this.obtenerColaboradores();
    }

    anyClickClose() {
        this.$doc = $(document).on(this.sbclickEvent, (e: any) => {
            if (!$(e.target).parents('.aside').length) {
                this.settings.layout.asideToggled = false;
            }
        });
    }

    ngOnDestroy() {
        if (this.$doc)
            this.$doc.off(this.sbclickEvent);
    }

    toggleSubmenuClick(event: any) {
        if (!this.isSidebarCollapsed() && !this.isSidebarCollapsedText() && !this.isEnabledHover()) {
            event.preventDefault();

            let target = $(event.target || event.srcElement || event.currentTarget);
            let ul: any, anchor = target;

            // find the UL
            if (!target.is('a')) {
                anchor = target.parent('a').first();
            }
            ul = anchor.next();

            // hide other submenus
            let parentNav = ul.parents('.sidebar-subnav');
            $('.sidebar-subnav').each((idx: any, el: any) => {
                let $el = $(el);
                // if element is not a parent or self ul
                if (!$el.is(parentNav) && !$el.is(ul)) {
                    this.closeMenu($el);
                }
            });

            // abort if not UL to process
            if (!ul.length) {
                return;
            }

            // any child menu should start closed
            ul.find('.sidebar-subnav').each((idx: any, el: any) => {
                this.closeMenu($(el));
            });

            // toggle UL height
            if (parseInt(ul.height(), 0)) {
                this.closeMenu(ul);
            }
            else {
                // expand menu
                ul.on('transitionend', () => {
                    ul.height('auto').off('transitionend');
                }).height(ul[0].scrollHeight);
                // add class to manage animation
                ul.addClass('opening');
            }

        }

    }

    // Close menu collapsing height
    closeMenu(elem: any) {
        elem.height(elem[0].scrollHeight); // set height
        elem.height(0); // and move to zero to collapse
        elem.removeClass('opening');
    }

    // toggleSubmenuHover(event: any) {
    //     let self = this;
    //     if (this.isSidebarCollapsed() || this.isSidebarCollapsedText() || this.isEnabledHover()) {
    //         event.preventDefault();

    //         this.removeFloatingNav();

    //         let target = $(event.target || event.srcElement || event.currentTarget);
    //         let ul, anchor = target;
    //         // find the UL
    //         if (!target.is('a')) {
    //             anchor = target.parent('a');
    //         }
    //         ul = anchor.next();

    //         if (!ul.length) {
    //             return; // if not submenu return
    //         }

    //         let $aside = $('.aside');
    //         let $asideInner = $aside.children('.aside-inner'); // for top offset calculation
    //         let $sidebar = $asideInner.children('.sidebar');
    //         let mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);
    //         let itemTop = ((anchor.parent().position().top) + mar) - $sidebar.scrollTop();

    //         let floatingNav = ul.clone().appendTo($aside);
    //         let vwHeight = $(window).height();

    //         // let itemTop = anchor.position().top || anchor.offset().top;

    //         floatingNav
    //             .removeClass('opening') // necesary for demo if switched between normal//collapsed mode
    //             .addClass('nav-floating')
    //             .css({
    //                 position: this.settings.layout.isFixed ? 'fixed' : 'absolute',
    //                 top: itemTop,
    //                 bottom: (floatingNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
    //             });

    //         floatingNav
    //             .on('mouseleave', () => { floatingNav.remove(); })
    //             .find('a').on('click', function (e) {
    //                 e.preventDefault(); // prevents page reload on click
    //                 // get the exact route path to navigate
    //                 let routeTo = $(this).attr('route');
    //                 if (routeTo) self.router.navigate([routeTo]);
    //             });

    //         this.listenForExternalClicks();

    //     }

    // }

    listenForExternalClicks() {
        let $doc = $(document).on('click.sidebar', (e: any) => {
            if (!$(e.target).parents('.aside').length) {
                this.removeFloatingNav();
                $doc.off('click.sidebar');
            }
        });
    }

    removeFloatingNav() {
        $('.nav-floating').remove();
    }

    isSidebarCollapsed() {
        return this.settings.layout.isCollapsed;
    }
    isSidebarCollapsedText() {
        return this.settings.layout.isCollapsedText;
    }
    isEnabledHover() {
        return this.settings.layout.asideHover;
    }

    //  obtenerColaboradores()
    //  {
    //     // console.log(1);
    //     let puesto = (this.__cockieService.get('puesto')) ? JSON.parse(this.__cockieService.get('puesto')) : null;  

    //     this._usuarioService.ObtenerColaboradoresACargo(puesto.PosicionID).subscribe((respuesta: any) => {
    //         if(respuesta.colaboradores != null && respuesta.colaboradores.length > 0){
    //             this.colaboradoresSelect = respuesta.colaboradores;
    //             let currentUser = (this.__cockieService.get('menuAlterno')) ? JSON.parse(this.__cockieService.get('menuAlterno')) : null;
    //             if (currentUser) {
    //                 this.MostrarRegresar = true;
    //                 this.numeroEmpleadoColaborador = currentUser.NumeroEmpleado;
    //             }else{
    //                 this.MostrarRegresar = false;
    //                 this.numeroEmpleadoColaborador = -1;
    //             }
    //             this.EsJefe = true;
    //         }else{
    //             this.EsJefe = false;
    //         }
    //     }, error => {
    //         // console.log(error);
    //     });
    //     // if(puesto != null && puesto.Colaboradores != null && puesto.Colaboradores.length > 0)
    //     // {            
    //     //     this.colaboradoresSelect = puesto.Colaboradores;  
    //     //     this.numeroEmpleadoColaborador = -1;
    //     //     this.EsJefe = true;
    //     // }
    //     // else 
    //     // {
    //     //     this.EsJefe = false;
    //     // }        
    //  }

    //  regresarMenuPropio()
    //  {
    //     this.__cockieService.set('menuAlterno', JSON.stringify(null), 0, '/',null, false, 'Lax');
    //     this.numeroEmpleadoColaborador = -1;
    //     this.MostrarRegresar = false;
    //     this.reloadMenu();
    //     this.__router.navigate(['/']);
    //  }

    //  cargarMenuColaborador()
    //  {
    //     let colaborador = {
    //         NumeroEmpleado: this.numeroEmpleadoColaborador,
    //         UsuarioID: 0,
    //         GrupoID: 0,
    //         PosicionID: 0
    //     }
        

    //     this._usuarioService.ObtenerEmpleado(this.numeroEmpleadoColaborador).subscribe(DatosEmpleado => {          
    //     colaborador.PosicionID = DatosEmpleado["usuarioID"][0]["nPosicion"];
    //     this._usuarioService.ObtenerUsuarioPorNumeroEmpleado(this.numeroEmpleadoColaborador).subscribe(resultado=>
    //         {
                
    //             if(resultado['usuarioID'].length > 0)
    //             {
    //                 colaborador.UsuarioID = resultado['usuarioID'][0]['UsuarioID'];
    //                 colaborador.GrupoID = resultado['usuarioID'][0]['GrupoID'];
    //             }
    //             let date = new Date(); date.setTime(date.getTime() + this.DIA);
    //             this.__cockieService.set('menuAlterno', JSON.stringify(colaborador), date, '/',null, false, 'Lax');
    //             this.MostrarRegresar = true;
    //             this.reloadMenu();
    //             this.__router.navigate(['/']);
    //         });
    //     });
        
    //  }
   
}

export class Menu{
    Activo? : boolean;
    Escritura? : number;
    Lectura? : number;
    FechaCreacion? : Date;
    FechaModificacion? : Date;
    Formulario?: Formulario;
    FormularioID?: number;
    Grupo: any;
    GrupoID?: number;
    GrupoFormularioID?: number;
    UsuarioCreacionID?: number;
    UsuarioModificacionID?: number;
    Imagen?: string;
}

export class Formulario{
    Activo?: boolean;
    Descripcion? : string;
    FormularioID? : number;
    Imagen? : string;
    Modulo? : Modulo;
    PadreID?: number;
    ModuloID?: number;
    Ruta?: string;
    Tipo?: number;
    Orden?: number;
}

export class Modulo {
    Activo? : boolean;
    Descripcion? : string;
    FechaCreacion? : Date;
    FechaModificacion? : Date;
    ModuloID?: number;
    UsuarioCreacionID?: number;
    UsuarioModificacionID?: number;
    imagen?: string;
}
