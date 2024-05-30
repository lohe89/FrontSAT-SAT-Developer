import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

//Servicios
import {
    AuthenticationService,
    UsuarioService,
    LoginService,
} from '../../../services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    valForm: FormGroup;
    returnUrl: string = '';
    loading: boolean = false;
    DIA: number = 86400000;
    public errcode: number = 0;
    msgError: string = '';
    isText: boolean = false;
    eyeIcon: string = 'eye-slash-fill.svg';
    type: string = 'password';

    constructor(
        private __coockieService: CookieService,
        private authenticationService: AuthenticationService,
        private _usuarioService: UsuarioService,
        private loginService: LoginService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        fb: FormBuilder,
    ) {
        this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
        this.valForm = fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.email])],
            'password': ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnInit() {
        this.__coockieService.deleteAll('../');
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    submitForm($ev: any) {
        this.loading = true;
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        this.__coockieService.deleteAll();

        if (this.valForm.get('email')?.value) {

        } else {
            this.loading = false;
        }
    }

    hideShowPass() {
        this.isText = !this.isText;
        this.isText ? (this.eyeIcon = 'eye-fill.svg') : (this.eyeIcon = 'eye-slash-fill.svg');
        this.isText ? (this.type = 'text') : (this.type = 'password');
    }


}