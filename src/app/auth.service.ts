import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { BaseClassService } from './API/main-crm-api/base-class.service';
import { Router } from '@angular/router';

export interface LoggedInUser {
  access: string,
  refresh: string,
  main_page: string
}

export interface AccessToken {
  access: string
}

export interface AccessRoute{
  access: boolean
  route: string | null
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseClassService {

  private accessTokenKey = "access_token";
  private refreshTokenKey = "refresh_token";
  private userViewKey = "userView";
  private timestampKey = "timeStamp";
  isRefreshing = false;

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  hasAccess(): AccessRoute{
    let hasAccess = this.getAccessToken()
    let accessRoute : AccessRoute ={access: false, route:""}
    if (hasAccess != 'undefined'){
      
      accessRoute.access = true
      accessRoute.route = this.getView()

    }
    return accessRoute
  }

  logIn(username: string, password: string): Observable<LoggedInUser> {
    return this.http.post<LoggedInUser>(this.completePath('token'), { email: username, password }).pipe(
      tap((response: LoggedInUser) => {
        this.setTokens(response.access, response.refresh, response.main_page);
        this.setTimeStamp();
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  private setTimeStamp(): void {
    const timestamp = Date.now().toString();
    localStorage.setItem(this.timestampKey, timestamp);
  }

  getTimeStamp(): number {
    const currTimestamp = localStorage.getItem(this.timestampKey);
    if (currTimestamp != null) {
      if (isNaN(+currTimestamp))
        return 0;
      else
        return +currTimestamp;
    } else {
      return 0;
    }
  }

  refreshToken(): Observable<AccessToken> {
    return this.http.post<AccessToken>(this.completePath('token/refresh'), { refresh: this.getCurrRefreshToken() }).pipe(
      tap((response: AccessToken) => {
        this.setAccessToken(response.access);
        this.setTimeStamp();
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  private setTokens(accessToken: string, refreshToken: string, userView: string): void {
    // Store tokens securely
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    localStorage.setItem(this.userViewKey, userView);
  }

  getCurrRefreshToken(): string | null {
    try {
      return localStorage.getItem(this.refreshTokenKey);
    } catch (error) {
      return null;
    }
  }

  authUrl(url: string) : boolean{
    switch (url){
      case this.completePath('token'):
        return true
        break
      case this.completePath('token/refresh'):
        return true
        break
      default:
        return false
    }
  }

  private setAccessToken(accessToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
  }

  getAccessToken(): string | null {
    try {
      return localStorage.getItem(this.accessTokenKey);
    } catch {
      return null;
    }
  }

  logOut(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userViewKey);
  }

  getView(): string | null {
    try {
      return localStorage.getItem(this.userViewKey);
    } catch (error) {
      return null;
    }
  }
}
