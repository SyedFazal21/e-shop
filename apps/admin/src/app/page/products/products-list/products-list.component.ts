import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@my-company/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'my-company-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products = [];
  endSubs$: Subject<any> = new Subject();


  constructor(
    private productService: ProductsService,
    private route: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(false);
    this.endSubs$.complete();
}

  getProducts() {
    this.productService.getProducts()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(productId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            this.getProducts();
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

  updateProduct(productId) {
    this.route.navigateByUrl(`products/form/${productId}`);
  }
}
