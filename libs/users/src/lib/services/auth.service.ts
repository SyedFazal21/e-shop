import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl + 'users/login';

  constructor(
    private http: HttpClient,
    private localStorgeService: LocalStorageService,
    private route: Router
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl, { email, password });
  }

  logout() {
    this.localStorgeService.removeToken();
    this.route.navigate(['/login']);
  }
}
