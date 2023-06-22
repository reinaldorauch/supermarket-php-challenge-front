import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private loggedInSubject = new BehaviorSubject(!!this.token);
  private tokenSubject = new BehaviorSubject(this.token);

  set token(t: string | null) {
    if (t) localStorage.setItem('token', t);
    else localStorage.removeItem('token');
    this.loggedInSubject.next(!!t);
    this.tokenSubject.next(t);
  }

  get token() {
    const token = localStorage.getItem('token');
    if (this.tokenSubject && this.tokenSubject.value !== token) {
      this.tokenSubject.next(token);
    }
    return token;
  }

  get currentToken() {
    return this.tokenSubject.asObservable();
  }

  get loggedIn() {
    return this.loggedInSubject.asObservable();
  }

  clear() {
    this.token = null;
  }
}
