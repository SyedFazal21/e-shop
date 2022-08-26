import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-thankyou-page',
  templateUrl: './thankyou-page.component.html',
  styles: [],
})
export class ThankyouPageComponent implements OnInit {
  constructor(
    private ordersService: OrdersService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const order = JSON.parse(localStorage.getItem('order'));

    this.ordersService.addOrder(order).subscribe(() => {
      this.cartService.emptyCart();
      localStorage.removeItem('order');
    });
  }
}
