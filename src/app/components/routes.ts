import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from "../guards/Auth.guard";
import { ValidateAccessGuard } from "../guards/validate-access.guard";
import { Component } from '@angular/core';
import { LoginComponent } from './login/login/login.component';

type PathMatch = "full" | "prefix" | undefined;

export const routes = [

    // {
    //     path: '',
    //     component: LayoutComponent,
    //     children: [
    //         { path: 'dashboard', Component:DashboardComponent},
    //         { path: 'usuarios', Component:UsuarioComponent},
            // { path: 'dashboard', loadChildren: () => import('./contribuyentes/contribuyentes/contribuyentes.module').then(m => m.ContribuyentesModule),canActivate:[ValidateAccessGuard] },
    //     ]
    // },
    // { path: '', loadChildren: () => import('./contribuyente/contribuyente.module').then(m => m.ContribuyenteModule) },
    // { path: '', component: LoginComponent, pathMatch: "full" as PathMatch},
    // { path: 'Login', component: LoginComponent, pathMatch: "full" as PathMatch},
    // { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    // { path: 'contribuyentes', loadChildren:() => import('./contribuyentes/contribuyentes/contribuyentes.module').then(m => m.ContribuyentesModule) }
    // { path: 'Pages', loadChildren:() => import('./layout/layout.module').then(m => m.LayoutModule) },
    // { path: '**', redirectTo: 'Login', pathMatch: "full" as PathMatch}
];