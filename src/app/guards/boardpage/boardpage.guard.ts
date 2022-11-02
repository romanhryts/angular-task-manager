import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { IUser } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class BoardpageGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.authState.getValue()) {
      return true;
    }
    return this.authService.checkAuth()
      .pipe(
        map((res: IUser) => {
          if (res.id) {
            return true;
          }
          this.router.navigate([ 'login' ]);
          return false;
        }),
        catchError(() => {
          this.router.navigate([ 'login' ]);
          return of(false);
        })
      );
  }

}
