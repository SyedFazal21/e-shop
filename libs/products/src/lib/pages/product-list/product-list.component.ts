import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'my-company-product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      params['id'] ? this.getProducts([params['id']]) : this.getProducts();
      params['id'] ? this.isCategoryPage = true : this.isCategoryPage = false;
    })
    this.getCategories();
  }

  getProducts(filter?: string[]) {
    this.productsService
      .getProducts(filter)
      .subscribe((products) => (this.products = products));
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  filterProducts() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);

    this.getProducts(selectedCategories);
  }
}
