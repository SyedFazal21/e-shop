import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartItemDetails } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemsDetailed: CartItemDetails[] = [];
  endSub$: Subject<any> = new Subject();
  cartCount = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.getCartItem();
  }

  ngOnDestroy(): void {
    this.endSub$.next(false);
    this.endSub$.complete();
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  getCartItem() {
    this.cartService.cartSub$
      .pipe(takeUntil(this.endSub$))
      .subscribe((cart) => {
        this.cartItemsDetailed = [];
        this.cartCount = cart?.items?.length ?? 0;
        cart.items.forEach((item) => {
          this.ordersService.getProduct(item.productId).subscribe((product) => {
            this.cartItemsDetailed.push({
              product,
              quantity: item.quantity,
            });
          });
        });
      });
  }

  deleteCartItem(productId) {
    this.cartService.deleteCartItem(productId);
  }

  updateCart(event, cartItem: CartItemDetails) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value,
      },
      true
    );
  }
}
