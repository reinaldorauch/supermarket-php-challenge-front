import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, firstValueFrom } from 'rxjs';
import {
  Product,
  ProductResponse,
  ProductType,
  ProductsResponse,
  TypeResponse,
  TypesResponse,
} from '../types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products$ = new Subject<Product[]>();
  private types$ = new Subject<ProductType[]>();
  private loading$ = new BehaviorSubject(false);

  get products() {
    return this.products$.asObservable();
  }

  get types() {
    return this.types$.asObservable();
  }

  get isLoading() {
    return this.loading$.asObservable();
  }

  constructor(private http: HttpClient) {}

  async init() {
    await this.load();
  }

  async load() {
    try {
      this.loading$.next(true);
      const [{ data: prods }, { data: types }] = await Promise.all([
        this.getProducts(),
        this.getTypes(),
      ]);
      this.products$.next(prods);
      this.types$.next(types);
    } catch (err: any) {
      throw err;
    } finally {
      this.loading$.next(false);
    }
  }

  private getProducts() {
    return firstValueFrom(
      this.http.get<ProductsResponse>(`${environment.apiBase}/product`)
    );
  }

  private getTypes() {
    return firstValueFrom(
      this.http.get<TypesResponse>(`${environment.apiBase}/product-type`)
    );
  }

  async create(data: Product) {
    try {
      this.loading$.next(true);
      await firstValueFrom(
        this.http.post<ProductResponse>(`${environment.apiBase}/product`, data)
      );
      await this.load();
    } catch (err: any) {
      throw err;
    } finally {
      this.loading$.next(false);
    }
  }

  async createType(data: ProductType) {
    try {
      this.loading$.next(true);
      await firstValueFrom(
        this.http.post<TypeResponse>(
          `${environment.apiBase}/product-type`,
          data
        )
      );
      await this.load();
    } catch (err: any) {
      throw err;
    } finally {
      this.loading$.next(false);
    }
  }
}
