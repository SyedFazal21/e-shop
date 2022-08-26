import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl + 'products/';
  constructor(private httpClient: HttpClient) {}

  getProducts(filter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (filter) {
      params = params.append('categories', filter.join(','));
    }
    return this.httpClient.get<Product[]>(this.apiUrl, { params });
  }

  addProduct(productForm: FormData): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, productForm);
  }

  getProduct(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}${productId}`);
  }

  updateProduct(product: Product, productId: string): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}${productId}`, product);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}${productId}`);
  }

  getProductsCount(): Observable<number> {
    return this.httpClient
      .get<number>(`${this.apiUrl}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProducts(count: Number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.apiUrl}/get/featured/${count}`
    );
  }
}
