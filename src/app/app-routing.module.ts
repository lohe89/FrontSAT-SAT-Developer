import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContribuyentesComponent } from './components/layout/pages/contribuyentes/contribuyentes.component';
import { UsuarioComponent } from './components/layout/pages/usuario/usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: "full" },
  { path: 'login', loadChildren:() => import('./components/login/login.module').then(m => m.LoginModule) },
   //{ path: 'login', component: LoginComponent },
  //  { path: 'contribuyentes', component: ContribuyentesComponent},
  //  { path: 'usuario', component: UsuarioComponent},
  { path: 'layout', loadChildren:() => import('./components/layout/layout.module').then(m => m.LayoutModule) },
  { path: '**', loadChildren:() => import('./components/login/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
