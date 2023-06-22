import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
  HttpStatusCode,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { token } = this.tokenService;

    // If dont have token, skip adding the authorization header
    if (!token) return next.handle(request);

    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(authReq).pipe(
      tap((ev) => {
        if (
          ev.type === HttpEventType.ResponseHeader &&
          ev.status === HttpStatusCode.Unauthorized
        ) {
          this.logout();
        }
      }),
      catchError((err) => {
        if (
          err instanceof HttpErrorResponse &&
          err.status === HttpStatusCode.Unauthorized
        ) {
          this.logout();
        }
        throw err;
      })
    );
  }

  private logout() {
    this.tokenService.clear();
    this.router.navigate(['/login']);
    throw new Error('not logged in');
  }
}
