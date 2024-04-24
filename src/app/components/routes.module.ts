import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
// import { LoginComponent } from './login/login/login.component';

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
    ]
})

export class RoutesModule {
    constructor() {}
}
