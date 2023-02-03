import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, tap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap(estado => {
        if (!estado) {
          this.router.navigate(['/login'])
        }
      })
    )
  }
  //CanLoad: Sirve para evitar que la aplicación cargue los módulos perezosamente si el usuario no está autorizado a hacerlo
  canLoad(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        tap(estado => {
          if (!estado) { this.router.navigate(['/login']) }
        }),
        take(1)
      )
  }

}
