import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../../../../environment/environment';
import { UsersFacade } from '../state/users.facade';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.apiUrl + 'users/';
  constructor(private httpClient: HttpClient, private usersFacade:UsersFacade) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}${userId}`);
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}${userId}`);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}${user.id}`, user);
  }

  getUsersCount(){
    return this.httpClient.get<number>(`${this.apiUrl}/get/count`)
    .pipe(map((value:any) => value.userCount));
  }

  initAppSession(){
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser(){
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuth(){
    return this.usersFacade.isAuthenticated$;
  }
}
