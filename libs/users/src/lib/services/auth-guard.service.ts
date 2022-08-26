import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private route: Router,
    private localStorageService: LocalStorageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = this.localStorageService.getToken();
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      if (tokenData.isAdmin && !this.isExpired(tokenData.exp) ) return true; //&& !this.isExpired(tokenData.exp)
    }
    this.route.navigate(['/login']);
    return false;
  }

  isExpired(expiration): boolean{
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
