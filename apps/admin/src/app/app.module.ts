import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './page/categories/categories-list/categories-list.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoriesFormComponent } from './page/categories/categories-form/categories-form.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductsListComponent } from './page/products/products-list/products-list.component';
import { ProductsFormComponent } from './page/products/products-form/products-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { UsersFormComponent } from './page/users/users-form/users-form.component';
import { UsersListComponent } from './page/users/users-list/users-list.component';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { OrdersDetailsComponent } from './page/orders/orders-details/orders-details.component';
import { OrdersListComponent } from './page/orders/orders-list/orders-list.component';
import { UsersModule, JwtInterceptor } from '@my-company/users';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';

const UI_MODULES = [
  ToolbarModule,
  FieldsetModule,
  InputMaskModule,
  TagModule,
  InputNumberModule,
  ToastModule,
  InputTextModule,
  ColorPickerModule,
  ConfirmDialogModule,
  TableModule,
  CardModule,
  ButtonModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
];


@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersFormComponent,
    UsersListComponent,
    OrdersDetailsComponent,
    OrdersListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UsersModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    NgxStripeModule.forRoot(
      'pk_test_51LahqOSJUrETnwC7iaPMQeJHE9cn1ymVDSUOVVEpP070AurttrbF1tMhv38ZIs61nBLxrxn62RtbTYn1TGkLijuW002vTNTBf4'
    ),
    HttpClientModule,
    ...UI_MODULES,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
