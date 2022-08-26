import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderItem } from '../../models/order-item';
import * as CountriesLib from 'i18n-iso-countries';
import { Order } from '../../models/order';
import { Cart } from '../../models/cart';
import { OrdersService } from '../../services/orders.service';
import { CartService } from '../../services/cart.service';
import { UsersService } from '@my-company/users';
import { Subject, take, takeUntil } from 'rxjs';
import { StripeService } from 'ngx-stripe';

declare const require;

@Component({
  selector: 'orders-check-out',
  templateUrl: './check-out.component.html',
  styles: [],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private cartService: CartService,
    private ordersService: OrdersService,
    private stripeService: StripeService
  ) {}

  endSub$: Subject<any> = new Subject();
  checkoutFormGroup: FormGroup;
  checkoutPage = false;
  isSubmitted = false;
  guestUserId = '630205ee1b75fc3e584eee66';
  orderItems: OrderItem[] = [];
  userId: string;
  countries = [];

  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillCheckOutForm();
    this.getOrderItems();
    this._getCountries();
  }

  ngOnDestroy(): void {
    this.endSub$.next(null);
    this.endSub$.complete();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  getOrderItems() {
    const cartItems: Cart = JSON.parse(localStorage.getItem('cart'));

    this.orderItems = cartItems.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
  }

  private _getCountries() {
    CountriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      CountriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  private _autoFillCheckOutForm() {
    this.userService
      .observeCurrentUser()
      .pipe(takeUntil(this.endSub$))
      .subscribe((user) => {
        if (user) {
          this.userId = user.id;
          this.checkoutForm['name'].setValue(user.name);
          this.checkoutForm['email'].setValue(user.email);
          this.checkoutForm['phone'].setValue(user.phone);
          this.checkoutForm['city'].setValue(user.city);
          this.checkoutForm['country'].setValue(user.country);
          this.checkoutForm['zip'].setValue(user.zip);
          this.checkoutForm['apartment'].setValue(user.apartment);
          this.checkoutForm['street'].setValue(user.street);
        }
      });
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['apartment'].value,
      shippingAddress2: this.checkoutForm['street'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: 0,
      user: this.userId == null ? this.guestUserId : this.userId,
      dateOrdered: `${Date.now()}`,
    };

    localStorage.setItem('order', JSON.stringify(order));

    this.ordersService
      .createCheckOutSession(this.orderItems)
      .subscribe((error) => {
        if (error) {
          console.log('error in redirecting to payment');
        }
      });
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
