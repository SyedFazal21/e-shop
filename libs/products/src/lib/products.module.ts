import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CatgoriesBannerComponent } from './components/catgories-banner/catgories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { ButtonModule } from 'primeng/button';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { RatingModule } from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import { UiModule } from '@my-company/ui';


const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'category/:id',
    component: ProductListComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    UiModule,
    CheckboxModule,
    InputNumberModule,
    RatingModule,
    FormsModule,
  ],
  declarations: [
    ProductsSearchComponent,
    CatgoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
  ],
  exports: [
    ProductsSearchComponent,
    CatgoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
  ],
})
export class ProductsModule {}
