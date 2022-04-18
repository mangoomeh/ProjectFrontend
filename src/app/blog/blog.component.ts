import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public sideBarIsOpen: boolean = false;
  public isBlogger: boolean = false;
  public userId: number = -1;
  constructor(
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isBlogger = this.authService.isBlogger();
    this.userId = this.authService.getUserId();
  }

  toggleSideBar() {
    this.sideBarIsOpen = !this.sideBarIsOpen;
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/']);
  }

  createNewBlogPost() {
    this.blogService
      .addBlog({
        userId: this.authService.getUserId(),
        title: '',
        description: '',
        content: '',
        blogImgUrl: '',
        isVisible: true,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate([`/blog/blogEditor/${res.id}`]);
        },
      });
  }
}
