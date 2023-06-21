export interface LoginData {
  username: string;
  password: string;
}

export interface ProductType {
  name: string;
  taxRate: number;
}

export interface Product {
  name: string;
  price: number;
  type: ProductType | number;
}
export interface CheckoutCartItem {
  quantity: number;
  product?: Product;
  chargedPrice: number;
  chargedTotalPrice: number;
  chargedTotalTax: number;
  chargedTax: number;
}

export interface CheckoutCart {
  items: CheckoutCartItem[];
  total: number;
  taxTotal: number;
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
}

export interface LoginResponse {
  token: string;
}

export type LoginApiResponse = ApiResponse<LoginResponse>;

export type CartResponse = ApiResponse<CheckoutCart>;
