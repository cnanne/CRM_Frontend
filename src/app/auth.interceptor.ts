import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, throwError, BehaviorSubject, timer } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router) {
    this.initTokenRefresh();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.authUrl(req.url)) {
      return next.handle(req);
    }

    const accessToken = this.authService.getAccessToken();

    return next.handle(this.addToken(req, accessToken)).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          return this.handleAuthErrors(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string | null): HttpRequest<any> {
    if (token) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return req;
  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.authService.isRefreshing) {
      this.authService.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.authService.isRefreshing = false;
          this.refreshTokenSubject.next(token.access);
          return next.handle(this.addToken(req, token.access));
        }),
        catchError(error => {
          this.authService.isRefreshing = false;
          this.authService.logOut();
          this.router.navigate(['/login']);
          return throwError(error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(() => {
          return next.handle(this.addToken(req, this.authService.getAccessToken()));
        })
      );
    }
  }

  private initTokenRefresh() {
    timer(0, 10000) // check every 10 seconds
      .pipe(
        switchMap(() => {
          const timestamp = this.authService.getTimeStamp();
          const elapsed = Date.now() - timestamp;
          const timeToRefresh = 13 * 60 * 1000; // 13 minutes in milliseconds
          if (elapsed >= timeToRefresh) {
            return this.authService.refreshToken();
          }
          return [];
        })
      )
      .subscribe(
        (token: any) => {
          this.refreshTokenSubject.next(token.access);
        },
        error => {
          console.error('Error refreshing token', error);
          // Handle error as needed
        }
      );
  }
}
