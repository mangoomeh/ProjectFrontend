import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseApiUrl: string;

  constructor(private http: HttpClient, private baseService: BaseService) {
    this.baseApiUrl = baseService.baseApiUrl + '/api/Blogs';
  }

  getBlogs() {
    return this.http.get<any>(this.baseApiUrl);
  }
}
