import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseApiUrl: string;
  constructor(private http: HttpClient, private baseService: BaseService) {
    this.baseApiUrl = baseService.baseApiUrl + '/api/Auth';
  }

  login(loginObj: any) {
    return this.http.post<any>(this.baseApiUrl + '/login', loginObj);
  }

  isLoggedIn() {
    return !!localStorage.getItem('jwt_token');
  }

  isBlogger() {
    return this.getUserRole() === 'Blogger';
  }

  getDecodedJWT() {
    const token = this.getToken();
    const decodedJWT = JSON.parse(window.atob(token?.split('.')[1]));
    return decodedJWT;
  }

  getUserId() {
    const decodedJWT = this.getDecodedJWT();
    return Number(decodedJWT.UserId);
  }

  getUserRole() {
    return this.getDecodedJWT().Role;
  }

  private getToken() {
    return localStorage.getItem('jwt_token')!;
  }
}
