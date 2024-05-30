import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';

const routes: Routes = [
   { path: '', component: LoginComponent, pathMatch: "full" },
   { path: 'Login', component: LoginComponent, pathMatch: "full" },
  // { path: 'contribuyentes', loadChildren:() => import('../app/components/contribuyentes/contribuyentes/contribuyentes.module').then(m => m.ContribuyentesModule) },
   { path: 'Pages', loadChildren:() => import('./components/layout/layout.module').then(m => m.LayoutModule) },
  // { path: 'Pages', component: LayoutComponent, pathMatch: "full" },
  // { path: '**', component: LoginComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
