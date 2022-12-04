import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiConnectionService } from './../services/api-connection.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({ 
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private APIservice: ApiConnectionService, private cookieService: CookieService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.APIservice.checkuserIsloggedin()) {
      return  true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
