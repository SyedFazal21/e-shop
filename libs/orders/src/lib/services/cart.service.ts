import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartSub$: BehaviorSubject<Cart> = new BehaviorSubject(
    JSON.parse(localStorage.getItem('cart'))
  );

  constructor() {}

  initLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      const selected = {
        items: [],
      };

      localStorage.setItem('cart', JSON.stringify(selected));
    }
  }

  emptyCart(){
    const cart = {
      items: [],
    };

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSub$.next(cart);
  }

  setCartItem(cartItem: CartItem, update?: boolean) {
    const cart: Cart = JSON.parse(localStorage.getItem('cart'));
    const itemExists = cart.items.find(
      (item) => item.productId === cartItem.productId
    );

    if (itemExists) {
      if (update) itemExists.quantity = cartItem.quantity;
      else itemExists.quantity = itemExists.quantity + cartItem.quantity;
    } else cart.items.push(cartItem);

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSub$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string) {
    const cart: Cart = JSON.parse(localStorage.getItem('cart'));
    const filter = cart.items.filter((item) => item.productId != productId);
    cart.items = filter;

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSub$.next(cart);
  }
}
