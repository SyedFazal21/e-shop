import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '@my-company/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'my-company-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit {
  orders = [];
  endSubs$: Subject<any> = new Subject();

  orderStatus = ORDER_STATUS;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(false);
    this.endSubs$.complete();
  }

  getOrders() {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((orders) => (this.orders = orders));
  }

  deleteOrder(orderid) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderid).subscribe(
          () => {
            this.getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product has been Deleted',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Falied to Delete product',
            });
          }
        );
      },
    });
  }

  showOrder(orderid) {
    this.router.navigateByUrl(`orders/${orderid}`);
  }
}
