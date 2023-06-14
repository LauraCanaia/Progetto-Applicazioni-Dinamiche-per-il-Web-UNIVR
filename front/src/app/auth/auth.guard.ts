import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth/auth.service";

// @ts-ignore
@Injectable({
  providedIn : 'root'
})

export class AuthGuard implements CanActivate{

  constructor(private authService : AuthService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return this.authService.isAuthenticated();
  }

}
