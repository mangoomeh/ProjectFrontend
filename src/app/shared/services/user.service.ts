import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public baseApiUrl: string;
  constructor(
    private http: HttpClient,
    private baseService: BaseService,
    private authService: AuthService
  ) {
    this.baseApiUrl = this.baseService.baseApiUrl + '/api/Users';
  }

  addUser(formData: any) {
    return this.http.post<any>(
      this.baseApiUrl,
      formData,
      this.authService.httpOptionsProvider()
    );
  }

  getUser(id: number) {
    return this.http.get<any>(
      this.baseApiUrl + `/${id}`,
      this.authService.httpOptionsProvider()
    );
  }

  updateUser(id: number, formData: any) {
    return this.http.put<any>(
      this.baseApiUrl + `/${id}`,
      formData,
      this.authService.httpOptionsProvider()
    );
  }

  changePassword(id: number, passwordChangeObj: any) {
    return this.http.put<any>(
      this.baseApiUrl + `/${id}/changePassword`,
      passwordChangeObj,
      this.authService.httpOptionsProvider()
    );
  }
}
