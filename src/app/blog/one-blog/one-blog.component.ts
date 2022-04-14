import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-one-blog',
  templateUrl: './one-blog.component.html',
  styleUrls: ['./one-blog.component.scss'],
})
export class OneBlogComponent implements OnInit {
  public blogDetails: any;
  public baseApiUrl: string = '';
  public comments: any[] = [];
  public comment: string = '';
  public commentObj: any = {
    content: '',
    userId: '',
    blogId: '',
  };
  public isAuthor: boolean = false;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.baseApiUrl = this.baseService.baseApiUrl;
    this.getBlog();
  }

  getBlog() {
    this.blogService
      .getBlog(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.blogDetails = res;
          this.isAuthor = res.userId === this.authService.getUserId();
        },
      });
  }

  dateParser(date: string) {
    const dateTime = new Date(date);
    return dateTime.toLocaleString();
  }

  postComment() {
    this.commentObj.content = this.comment;
    this.commentObj.userId = this.authService.getUserId();
    this.commentObj.blogId = this.blogDetails.id;
    this.blogService.postComment(this.commentObj).subscribe({
      next: (res) => {
        this.comment = '';
        console.log(res);
        this.getBlog();
      },
    });
  }
}
