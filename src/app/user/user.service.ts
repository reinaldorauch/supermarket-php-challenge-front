import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token.service';
import {
  BehaviorSubject,
  Subject,
  filter,
  firstValueFrom,
  map,
  switchMap,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserResponse, UsersResponse } from '../types';
import { Injectable } from '@angular/core';

function isNotNull<T>(v: T): v is NonNullable<T> {
  return v != null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUserInfo$ = this.tokenService.currentToken.pipe(
    filter(isNotNull),
    switchMap((token: string) => this.getUserInfo(this.parseToken(token).sub))
  );
  private usersSubject = new Subject<User[]>();
  private loadingSubject = new BehaviorSubject(false);

  get users() {
    return this.usersSubject.asObservable();
  }

  get isLoading() {
    return this.loadingSubject.asObservable();
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  async load() {
    this.loadingSubject.next(true);

    try {
      const { data: users } = await firstValueFrom(
        this.http.get<UsersResponse>(`${environment.apiBase}/users`)
      );
      this.usersSubject.next(users);
    } catch (err: any) {
      throw err;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  getUserInfo(id: number) {
    return this.http
      .get<UserResponse>(`${environment.apiBase}/users/${id}`)
      .pipe(map(({ data }) => data));
  }

  async create(data: any) {
    await firstValueFrom(this.http.post(`${environment.apiBase}/users`, data));
    await this.load();
  }

  private parseToken(token: string) {
    console.log(token);
    return JSON.parse(atob(token.replace(/^.+\.(.+)\..+$/, '$1')));
  }
}
