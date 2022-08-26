import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { OrderItem } from '../models/order-item';
import { StripeService } from 'ngx-stripe';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  apiUrl = environment.apiUrl + 'orders/';
  apiUrlProducts = environment.apiUrl + 'products/';

  constructor(
    private httpClient: HttpClient,
    private stripeService: StripeService
  ) {}

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.apiUrl);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiUrl}${orderId}`);
  }

  addOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.apiUrl, order);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}${orderId}`);
  }

  updateOrder(order: { status: string }, orderId: string): Observable<Order> {
    return this.httpClient.put<Order>(`${this.apiUrl}${orderId}`, order);
  }

  getOrdersCount(): Observable<number> {
    return this.httpClient
      .get<number>(`${this.apiUrl}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.httpClient
      .get<number>(`${this.apiUrl}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }

  getProduct(productId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrlProducts}${productId}`);
  }

  createCheckOutSession(orderItems: OrderItem[]) {
    return this.httpClient
      .post(`${this.apiUrl}create-checkout-session`, orderItems)
      .pipe(
        switchMap((session: { id: string }) =>
          this.stripeService.redirectToCheckout({ sessionId: session.id })
        )
      );
  }
}
