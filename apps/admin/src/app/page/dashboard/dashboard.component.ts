import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@my-company/orders';
import { ProductsService } from '@my-company/products';
import { UsersService } from '@my-company/users';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics = [];
  endSubs$: Subject<any> = new Subject();


  constructor(private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ])
    .pipe(takeUntil(this.endSubs$))
    .subscribe((values) => {
      this.statistics = values;
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(false);
    this.endSubs$.complete();
}

}
