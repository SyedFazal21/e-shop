import { Component, Input, OnInit } from '@angular/core';
import { CartItem, CartService } from '@my-company/orders';
import { MessageService } from 'primeng/api';
import { Product } from '../../models/product';

@Component({
  selector: 'my-company-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  addToCart(productId: string) {
    const cartItem: CartItem = {
      productId: productId,
      quantity: 1,
    };
    this.cartService.setCartItem(cartItem);
  }
}
