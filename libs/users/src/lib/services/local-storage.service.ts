import { Injectable } from '@angular/core';

const TOKEN = 'JwtToken';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }

  isValidToken() {
    const token = this.getToken();
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      return !this.isExpired(tokenData.exp);
    } else {
      return false;
    }
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      if (tokenData) return tokenData.userId;
    }
    return null;
  }

  isExpired(expiration): boolean{
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
