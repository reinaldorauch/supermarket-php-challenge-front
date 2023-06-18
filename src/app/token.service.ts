import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  set token(t: string | null) {
    t && localStorage.setItem('token', t);
  }

  get token() {
    return localStorage.getItem('token');
  }
}
