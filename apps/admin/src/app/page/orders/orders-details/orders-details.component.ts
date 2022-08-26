import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@my-company/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'my-company-orders-details',
  templateUrl: './orders-details.component.html',
  styles: [],
})
export class OrdersDetailsComponent implements OnInit {
  order;
  selectedStatus;
  orderStatus = [];

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getOrder();
    this.mapOrderStatus();
  }

  mapOrderStatus() {
    this.orderStatus = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
  }

  getOrder() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.ordersService.getOrder(params['id']).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }

  onStatusChange(event) {
    this.ordersService
      .updateOrder({ status: event.value }, this.order.id)
      .subscribe(
        () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Status has been Updated',
        });
      }, () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Falied to update status'
        });
      });
  }
}
