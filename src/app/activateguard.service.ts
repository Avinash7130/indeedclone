import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateguardService implements CanActivate {

  constructor(private LoginService:LoginService,private router:Router,
    private jwtHelperService:JwtHelperService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
     boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(this.LoginService.isAuthenticated())
      {

        return true;
        
      }
      
        else {
          alert('you are not authorized ');
          this.router.navigateByUrl("/login");
          return false;
        //   debugger
        //   return this.LoginService.refreshToken().pipe(
        //     switchMap((newToken) => {
        //       if (newToken) {
            
        //         return of(true); 
        //       } else {
              
        //         alert('You are not authorized to access this information!!!');
        //         this.router.navigateByUrl("/login");
        //         return of(false); 
        //       }
        //     }),
        //     catchError(error => {
        //       console.error('Error in token refresh', error);
            
        //       alert('Error refreshing token. Please login again.');
        //       this.router.navigateByUrl("/login");
        //       return of(false); 
        //     })
        //   );
        // }
      }
    }
  }