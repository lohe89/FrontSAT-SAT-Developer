import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

const routes: Routes = [ {
  path: '',
  component: LayoutComponent,
  children: [
      { path: 'dashboard', component:DashboardComponent},
      { path: 'usuarios', component:UsuarioComponent},
      { path: 'contribuyentes', loadChildren: () => import('./pages/contribuyentes/contribuyentes.module').then(m => m.ContribuyentesModule) },
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
