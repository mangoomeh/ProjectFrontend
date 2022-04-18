import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  public baseApiUrl: string = '';

  constructor(
    private baseService: BaseService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.baseApiUrl = baseService.baseApiUrl + '/api/Comments';
  }

  postComment(commentObj: any) {
    return this.http.post<any>(
      this.baseService.baseApiUrl + '/api/Comments',
      commentObj,
      this.authService.httpOptionsProvider()
    );
  }

  editComment(commentObj: any) {
    return this.http.put<any>(
      this.baseApiUrl,
      commentObj,
      this.authService.httpOptionsProvider()
    );
  }

  deleteComment(id: number) {
    return this.http.delete<any>(
      this.baseApiUrl + `/${id}`,
      this.authService.httpOptionsProvider()
    );
  }
}
