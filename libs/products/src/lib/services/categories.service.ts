import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import {environment} from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrl = environment.apiUrl + 'categories/';
  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(
      this.apiUrl
    );
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.httpClient.get<Category>(
      `${this.apiUrl}${categoryId}`
    );
  }

  addCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(
      this.apiUrl,
      category
    );
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.apiUrl}${categoryId}`
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(
      `${this.apiUrl}${category.id}`,
      category
    );
  }
}
