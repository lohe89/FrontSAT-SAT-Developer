import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { LoginAPI } from 'src/app/Interfaces/login-api';
import { UsuarioAPI } from 'src/app/Interfaces/usuario-api';
import { UtilidadService } from 'src/app/shared/utilidad.service';


//Servicios
import {
    AuthenticationService,
    UsuarioService,
    LoginService,
} from '../../services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    valForm: FormGroup; //formulario login
    returnUrl: string = '';
    loading: boolean = false;
    DIA: number = 86400000;
    public errcode: number = 0;
    msgError: string = '';
    isText: boolean = false;
    eyeIcon: string = 'eye-slash-fill.svg';
    type: string = 'password';
    mostrarLoading: boolean = false;

    constructor(
        private _utilidadServicio: UtilidadService, 
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
    
    IniciarSesion(){
        this.loading = true ;    
        const request: LoginAPI = {
            email: this.valForm.value.email,
            password: this.valForm.value.password,
        }    

        this._usuarioService.iniciarSesion(request).subscribe({
            next:(data) => {
                if(data.estatus){
                    this._utilidadServicio.guardarSesionUsuario(data.value);
                    this.router.navigate(["layout/"]);
                }else{
                    this._utilidadServicio.mostrarAlerta("No se encontraron coincidencias", "OPPS!");    
                }
            },
            complete:() => {
                this.loading = false;
            },
            error:(error) => {
                this._utilidadServicio.mostrarAlerta(error.message, "OPPS!");    
            }
        });
    }


    ngOnInit() {        
         this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    hideShowPass() {
        this.isText = !this.isText;
        this.isText ? (this.eyeIcon = 'eye-fill.svg') : (this.eyeIcon = 'eye-slash-fill.svg');
        this.isText ? (this.type = 'text') : (this.type = 'password');
    }


}