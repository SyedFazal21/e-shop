import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@my-company/users';
import { CategoriesFormComponent } from './page/categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './page/categories/categories-list/categories-list.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { OrdersDetailsComponent } from './page/orders/orders-details/orders-details.component';
import { OrdersListComponent } from './page/orders/orders-list/orders-list.component';
import { ProductsFormComponent } from './page/products/products-form/products-form.component';
import { ProductsListComponent } from './page/products/products-list/products-list.component';
import { UsersFormComponent } from './page/users/users-form/users-form.component';
import { UsersListComponent } from './page/users/users-list/users-list.component';
import { ShellComponent } from './shared/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoriesListComponent,
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent,
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/form',
        component: ProductsFormComponent,
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent,
      },
      {
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'users/form',
        component: UsersFormComponent,
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent,
      },
      {
        path: 'orders',
        component: OrdersListComponent,
      },
      {
        path: 'orders/:id',
        component: OrdersDetailsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/'
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})


export class AppRoutingModule { }

