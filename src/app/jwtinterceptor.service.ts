import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { DebugElement, Injectable } from '@angular/core';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtinterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUserSession = sessionStorage.getItem('currentuser');
  
    if (currentUserSession) {
      const currentuser = JSON.parse(currentUserSession);
  
      if (this.loginService.isAuthenticated()) {
        const modifiedReq = this.addTokenToRequest(req, currentuser.token);
        return next.handle(modifiedReq);
      } else {
        return this.handleNotAuthenticated(req, next);
      }
    }
    return next.handle(req);
  }
  
  private handleNotAuthenticated(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          return this.handle401Or403Error(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }
  private addTokenToRequest(
    req: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  private refreshTokenAndHandleRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debugger
    return this.loginService.refreshToken().pipe(
      switchMap((newToken) => {
        if (newToken) {
          req = this.addTokenToRequest(req, newToken);
          return next.handle(req);
        } else {
          this.loginService.LogOut();
          return throwError('Refresh token failed');
        }
      }),
      catchError((error) => {
        console.error('Error in token refresh', error);
        return throwError(error);
      })
    );
  }

  private handle401Or403Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debugger
    return this.refreshTokenAndHandleRequest(req, next);
  }
}