import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from "ngx-bootstrap/modal";
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
    { path: '', component: LoginComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ModalModule,
        ReactiveFormsModule,
        // SelectModule,
        MatIconModule,
        MatTooltipModule,
        // NgxCaptchaModule,
        MatDialogModule,
        AlertModule.forRoot(),
        ToastrModule
    ],
    declarations: [LoginComponent],
    exports: [
        RouterModule
    ]
})
export class LoginModule { }
