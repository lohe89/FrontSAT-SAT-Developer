import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private __coockieService: CookieService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let session = this.parseValidator('session');
        if (session) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    parseValidator(cookie: string): Object {
        return (this.__coockieService.get(cookie)) ? JSON.parse(this.__coockieService.get(cookie)) : null;
    }
}
