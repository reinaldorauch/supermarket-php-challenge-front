import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(username: string, password: string) {
    this.http.post();
  }
}
