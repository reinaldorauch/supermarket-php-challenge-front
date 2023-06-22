export interface LoginData {
  username: string;
  password: string;
}

export interface ProductType {
  id: number;
  name: string;
  taxRate: number;
}

export interface Product {
  id: number;
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

export type ProductsResponse = ApiResponse<Product[]>;
export type ProductResponse = ApiResponse<Product>;
export type TypesResponse = ApiResponse<ProductType[]>;
export type TypeResponse = ApiResponse<ProductType>;
