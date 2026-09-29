import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
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
  errorDemoLoading = false;
  errorDemoMessage = '';
  errorDemoStatus: number | null = null;

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

  requestMissingProduct(): void {
    this.errorDemoLoading = true;
    this.errorDemoMessage = '';
    this.errorDemoStatus = null;

    this.subscriptions.add(
      this.productService.getMissingProduct(999999).subscribe({
        next: (product) => {
          this.errorDemoMessage = `Unexpectedly received product ${product.id}.`;
          this.errorDemoLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Product request failed in ApiProductsComponent:', error);
          this.errorDemoMessage = 'We could not find that product. Try again to repeat the request.';
          this.errorDemoStatus = error.status;
          this.errorDemoLoading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
