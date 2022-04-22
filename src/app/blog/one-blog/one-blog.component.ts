import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { BlogService } from 'src/app/shared/services/blog.service';
import { CommentService } from 'src/app/shared/services/comment.service';

@Component({
  selector: 'app-one-blog',
  templateUrl: './one-blog.component.html',
  styleUrls: ['./one-blog.component.scss'],
})
export class OneBlogComponent implements OnInit {
  // fetched Blog information
  public blogDetails: any;

  // baseApiUrl to render images
  public baseApiUrl: string = '';

  // fetched Comments of Blog
  public comments: any[] = [];
  public isAuthor: boolean = false;
  public userId: number = 0;
  
  // postComment
  public comment: string = '';
  public commentObj: any = {
    content: '',
    userId: '',
    blogId: '',
  };

  // editComment
  public editedCommentId: number = 0;
  public editedComment: string = '';

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private authService: AuthService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.baseApiUrl = this.baseService.baseApiUrl;
    this.getBlog();
    this.userId = this.authService.getUserId();
  }

  getBlog() {
    this.blogService
      .getBlog(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe({
        next: (res) => {
          this.blogDetails = res;
          this.isAuthor = res.userId === this.userId;
        },
      });
  }

  dateParser(date: string) {
    const dateTime = new Date(date);
    return dateTime.toLocaleString();
  }

  postComment() {
    if (!this.comment) {
      return;
    }
    this.commentObj.content = this.comment;
    this.commentObj.userId = this.authService.getUserId();
    this.commentObj.blogId = this.blogDetails.id;
    this.commentService.postComment(this.commentObj).subscribe({
      next: (res) => {
        this.comment = '';
        this.getBlog();
      },
    });
  }

  onEditComment(comment: any) {
    this.editedCommentId = comment.id;
    this.editedComment = comment.content;
  }

  editComment() {
    this.commentService
      .editComment({
        id: this.editedCommentId,
        content: this.editedComment,
      })
      .subscribe({
        next: (res) => {
          document.getElementById('close-editComment')?.click();
          this.getBlog();
        },
      });
  }

  deleteComment() {
    this.commentService.deleteComment(this.editedCommentId).subscribe({
      next: (res) => {
        document.getElementById('close-editComment')?.click();
        this.getBlog();
      },
    });
  }
}
