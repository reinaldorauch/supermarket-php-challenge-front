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
import { CheckoutCart, CartResponse, AddItemData } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private $currentCart = new BehaviorSubject<CheckoutCart | null>(null);
  private $isLoading = new BehaviorSubject(false);
  constructor(private http: HttpClient) {}

  get isLoading() {
    return this.$isLoading.asObservable();
  }

  get currentCart() {
    return this.$currentCart.asObservable();
  }

  getCurrentCartId(): number | undefined {
    return this.$currentCart.value?.id;
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
  async addItem({ cartId, ...data }: AddItemData) {
    this.$isLoading.next(true);
    try {
      await firstValueFrom(
        this.http.post<CartResponse>(
          `${environment.apiBase}/checkout-cart/${cartId}/add`,
          data
        )
      );
      this.init();
    } catch (err: any) {
      throw err;
    } finally {
      this.$isLoading.next(false);
    }
  }
}
