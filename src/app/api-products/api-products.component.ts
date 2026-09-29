import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-api-products',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './api-products.component.html',
  styleUrl: './api-products.component.css'
})
export class ApiProductsComponent {
  private readonly productService = inject(ProductService);

  readonly products$ = this.productService.getProducts();
}
