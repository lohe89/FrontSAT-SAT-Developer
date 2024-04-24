import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from "../guards/Auth.guard";
import { ValidateAccessGuard } from "../guards/validate-access.guard";

export const routes = [

    // {
    //     path: '',
    //     component: LayoutComponent,
    //     canActivate: [AuthGuard],
    //     children: [
    //         { path: 'configuracionMenu', loadChildren: () => import('./contribuyentes/contribuyentes/contribuyentes.module').then(m => m.ContribuyentesModule),canActivate:[ValidateAccessGuard] },
    //     ]
    // },
    // { path: '', loadChildren: () => import('./contribuyente/contribuyente.module').then(m => m.ContribuyenteModule) },
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: 'contribuyentes', loadChildren:() => import('./contribuyentes/contribuyentes/contribuyentes.module').then(m => m.ContribuyentesModule) }

];