import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  catchError,
  firstValueFrom,
  tap,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { CheckoutCart, CartResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private $currentCart = new Subject<CheckoutCart | null>();
  private $isLoading = new BehaviorSubject(false);
  constructor(private http: HttpClient) {}

  get isLoading() {
    return this.$isLoading.asObservable();
  }

  get currentCart() {
    return this.$currentCart.asObservable();
  }

  async init() {
    this.$isLoading.next(true);
    try {
      const { data: cart } = await firstValueFrom(
        this.http.get<CartResponse>(
          `${environment.apiBase}/checkout-cart/current`
        )
      );

      this.$currentCart.next(cart);
      this.$isLoading.next(false);
    } catch (err: any) {
      this.$isLoading.next(false);
      if (err.status === HttpStatusCode.NotFound) {
        this.$currentCart.next(null);
        return;
      }
      throw err;
    }
  }

  async create() {
    this.$isLoading.next(true);
    try {
      const { data: cart } = await firstValueFrom(
        this.http.post<CartResponse>(`${environment.apiBase}/checkout-cart`, '')
      );
      this.$currentCart.next(cart);
    } catch (err: any) {
      throw err;
    } finally {
      this.$isLoading.next(false);
    }
  }
}
