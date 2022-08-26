import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [],
})
export class OrderSummaryComponent implements OnInit {
  endSubs$: Subject<any> = new Subject();
  totalPrice: number;
  checkoutPage;

  constructor(
    private cartService: CartService,
    private router: Router,
    private ordersService: OrdersService
  ) {
    this.router.url.includes('/checkout')
      ? (this.checkoutPage = true)
      : (this.checkoutPage = false);
  }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(false);
    this.endSubs$.complete();
  }

  _getOrderSummary() {
    this.cartService.cartSub$
      .pipe(takeUntil(this.endSubs$))
      .subscribe((cart) => {
        this.totalPrice = 0;
        if (cart) {
          cart.items.map((item) => {
            this.ordersService
              .getProduct(item.productId)
              .pipe(take(1))
              .subscribe((product) => {
                this.totalPrice += product.price * item.quantity;
              });
          });
        }
      });
  }

  navigateToCheckOut() {
    this.router.navigate(['/checkout']);
  }
}
