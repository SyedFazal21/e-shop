import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@my-company/orders';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'my-company-product-details',
  templateUrl: './product-details.component.html',
  styles: [],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product = null;
  quantity = 1;
  endSub$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getProduct(params['id']);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSub$.next(false);
    this.endSub$.complete();
  }

  getProduct(id: string) {
    this.productsService
      .getProduct(id)
      .pipe(takeUntil(this.endSub$))
      .subscribe((product) => (this.product = product));
  }

  addToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity,
    };

    this.cartService.setCartItem(cartItem);
  }
}
