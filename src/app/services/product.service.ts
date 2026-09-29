import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductDeletionResponse extends Product {
  isDeleted: boolean;
  deletedOn: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly productsUrl = 'https://dummyjson.com/products';

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.productsUrl);
  }

  deleteProduct(id: number): Observable<ProductDeletionResponse> {
    return this.http.delete<ProductDeletionResponse>(`${this.productsUrl}/${id}`);
  }
}
