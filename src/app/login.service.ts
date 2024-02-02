import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, switchMap } from 'rxjs/operators';
import { Token } from '@angular/compiler';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserName:string="";
  

  constructor(private httpclient:HttpClient,private router:Router,
    private jwtHelperService:JwtHelperService) { }

    checkUser(login: Login): Observable<any> {
      debugger;
      return this.httpclient.post<any>("https://localhost:7261/api/AccountController/authenticate", login)
        .pipe(
          switchMap(u => {
            if (u) {
              this.currentUserName = u.username;
              
              sessionStorage["currentuser"] = JSON.stringify(u);
    
             
              return this.httpclient.get<any>(`https://localhost:7261/api/Employee/${u.employeeId}`);
            }
            return of(null);
          }),
          map(employee => {
            if (employee) {
       
              sessionStorage["currentemployee"] = JSON.stringify(employee);
            }
            return null;
          })
        );
    }

  refreshToken(): Observable<string | null> {
    const currentUserSession = sessionStorage.getItem('currentuser');
    if (!currentUserSession) {
      return new Observable< null>();
    }
    const currentuser = JSON.parse(currentUserSession);
    const refreshTokenRequest = {
      refreshToken: currentuser.refreshToken,
      createdAt:currentuser.refreshTokenCreatedAt,
      expiresAt:currentuser.refreshTokenExpiresAt
    };
    return this.httpclient.post<any>("https://localhost:7261/api/AccountController/refresh", refreshTokenRequest, httpOptions)
    .pipe(
      map((response: any) => {
        if (response && response.token) {
          currentuser.token = response.token;
          sessionStorage['currentuser'] = JSON.stringify(currentuser);
          return currentuser.token;
        } else {
          console.warn(' does not contain a valid token:', response);
          return null;
        }
      }),
      catchError((error) => {
        console.error('Refresh token error:', error);
        return throwError('Failed to refresh token');
      })
    );
  }
  LogOut()
  {
  this.currentUserName="";
  sessionStorage.removeItem("currentuser");
  this.router.navigateByUrl("/login");
  }
  public isAuthenticated():boolean
  {
    if(this.jwtHelperService.isTokenExpired())
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError('An error occurred. Please try again.');
  }
}
  



