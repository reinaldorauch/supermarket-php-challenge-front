import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private loggedInSubject = new BehaviorSubject(!!this.token);

  set token(t: string | null) {
    if (t) localStorage.setItem('token', t);
    else localStorage.removeItem('token');
    this.loggedInSubject.next(!!t);
  }

  get token() {
    return localStorage.getItem('token');
  }

  get loggedIn() {
    return this.loggedInSubject.asObservable();
  }

  clear() {
    this.token = null;
  }
}
