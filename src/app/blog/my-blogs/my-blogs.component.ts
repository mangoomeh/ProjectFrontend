import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { BlogService } from 'src/app/shared/services/blog.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.scss'],
})
export class MyBlogsComponent implements OnInit {
  public blogList: any[] = [];
  public baseApiUrl: string = '';
  public fetchedUserObj: any;
  public isUser: boolean = false;

  constructor(
    private blogService: BlogService,
    private baseService: BaseService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.baseApiUrl = this.baseService.baseApiUrl;
    this.route.paramMap.subscribe((paramMap) => {
      const routeId = Number(paramMap.get('id'));
      this.isUser = routeId === this.authService.getUserId();
      this.userService.getUser(routeId).subscribe({
        next: (res) => {
          this.fetchedUserObj = res;
        },
      });
      this.blogService.getBlogByUserId(routeId).subscribe({
        next: (res) => {
          this.blogList = res;
        },
      });
    });
  }

  dateParser(updatedDate: string, createdDate: string) {
    if (!updatedDate) {
      const createdDateTime = new Date(createdDate);
      return 'Created Date: ' + createdDateTime.toLocaleString();
    }
    const dateTime = new Date(updatedDate);
    return 'Updated: ' + dateTime.toLocaleString();
  }

  pseudoHtmlParser(htmlString: string) {
    return (
      htmlString
        .slice(0, 500)
        .replace(/<\/?[^>]+(>|$)/g, '\n')
        .slice(0, 400) + '...'
    );
  }
}
