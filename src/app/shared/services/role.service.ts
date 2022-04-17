import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  baseApiUrl: string;
  constructor(
    private http: HttpClient,
    private baseService: BaseService,
    private authService: AuthService
  ) {
    this.baseApiUrl = baseService.baseApiUrl + '/api/Roles';
  }

  getRoles() {
    return this.http.get<any>(
      this.baseApiUrl,
      this.authService.httpOptionsProvider()
    );
  }
}
