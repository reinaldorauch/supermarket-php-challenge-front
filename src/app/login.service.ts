import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from '../environments/environment';
import { catchError, tap } from 'rxjs';
import { LoginData } from './types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(data: LoginData) {
    return this.http
      .post<LoginApiResponse>(`${environment.apiBase}/auth/login`, data)
      .pipe(
        tap(({ data }) => {
          this.tokenService.token = data.token;
        }),
        catchError((err) => {
          const msg = err?.error?.error?.description;
          if (msg) throw new Error(msg);
          throw err;
        })
      );
  }
}

interface ApiResponse<T> {
  statusCode: number;
  data: T;
}

interface LoginResponse {
  token: string;
}

type LoginApiResponse = ApiResponse<LoginResponse>;
