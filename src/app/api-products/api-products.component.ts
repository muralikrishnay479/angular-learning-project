import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { ProductService, ProductDeletionResponse } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-api-products',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './api-products.component.html',
  styleUrl: './api-products.component.css'
})
export class ApiProductsComponent implements OnDestroy {
  private readonly productService = inject(ProductService);
  private readonly subscriptions = new Subscription();

  readonly products$ = this.productService.getProducts();
  deletedProductIds = new Set<number>();
  deletedProduct: ProductDeletionResponse | null = null;
  deletingId: number | null = null;
  deleteError = '';

  deleteProduct(id: number): void {
    this.deletingId = id;
    this.deleteError = '';

    this.subscriptions.add(
      this.productService.deleteProduct(id).subscribe({
        next: (product) => {
          this.deletedProduct = product;
          this.deletedProductIds = new Set(this.deletedProductIds).add(id);
          this.deletingId = null;
        },
        error: () => {
          this.deleteError = 'The product could not be deleted.';
          this.deletingId = null;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
