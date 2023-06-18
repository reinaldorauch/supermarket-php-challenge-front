import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private $currentCart = new Subject();
  constructor(private http: HttpClient) {}

  get currentCart() {
    return this.$currentCart.asObservable();
  }
}
