import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { API_BASE_URL } from '../app-tokens';

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
  private readonly productsUrl = inject(API_BASE_URL) + '/products';

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.productsUrl);
  }

  deleteProduct(id: number): Observable<ProductDeletionResponse> {
    return this.http.delete<ProductDeletionResponse>(`${this.productsUrl}/${id}`);
  }

  getMissingProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Product request failed in ProductService:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          responseBody: error.error
        });

        return throwError(() => error);
      })
    );
  }
}