import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseApiUrl: string;

  constructor(
    private http: HttpClient,
    private baseService: BaseService,
    private authService: AuthService
  ) {
    this.baseApiUrl = baseService.baseApiUrl + '/api/Blogs';
  }

  getBlogs() {
    return this.http.get<any>(
      this.baseApiUrl,
      this.authService.httpOptionsProvider()
    );
  }

  getBlog(id: number) {
    return this.http.get<any>(
      this.baseApiUrl + `/${id}`,
      this.authService.httpOptionsProvider()
    );
  }

  getBlogByUserId(id: number) {
    return this.http.get<any>(
      this.baseApiUrl + `/UserId/${id}`,
      this.authService.httpOptionsProvider()
    );
  }

  addBlog(blogObj: any) {
    return this.http.post<any>(
      this.baseApiUrl,
      blogObj,
      this.authService.httpOptionsProvider()
    );
  }

  updateBlog(formData: any) {
    return this.http.put<any>(
      this.baseApiUrl,
      formData,
      this.authService.httpOptionsProvider()
    );
  }

  deleteBlog(id: number) {
    return this.http.delete<any>(
      this.baseApiUrl + `/${id}`,
      this.authService.httpOptionsProvider()
    );
  }

  postComment(commentObj: any) {
    return this.http.post<any>(
      this.baseService.baseApiUrl + '/api/Comments',
      commentObj,
      this.authService.httpOptionsProvider()
    );
  }
}
