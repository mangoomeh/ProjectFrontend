import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
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
    return this.http.post<any>(this.baseApiUrl + '/login', loginObj).subscribe({
      next: (res) => {
        localStorage.setItem('jwt_token', res.token);
      },
    });
  }

  private getToken() {
    return localStorage.getItem('jwt_token')!;
  }
}
