import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'my-company-featured-product',
  templateUrl: './featured-product.component.html',
  styles: [],
})
export class FeaturedProductComponent implements OnInit {
  featuredProducts: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getFeaturedProducts();
  }

  getFeaturedProducts() {
    this.productsService.getFeaturedProducts(4).subscribe((products) => {
      this.featuredProducts = products;
    });
  }
}
