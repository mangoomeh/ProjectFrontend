import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseApiUrl: string;
  constructor(private http: HttpClient, private baseService: BaseService) {
    this.baseApiUrl = this.baseService.baseApiUrl + '/api/Users';
  }

  addUser(formData: any) {
    return this.http.post<any>(this.baseApiUrl, formData);
  }
}
