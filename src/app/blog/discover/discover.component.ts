import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
  public blogList: any[] = [];
  public baseApiUrl: string = '';
  constructor(
    private blogService: BlogService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.baseApiUrl = this.baseService.baseApiUrl;
    this.blogService.getBlogs().subscribe({
      next: (res) => {
        this.blogList = res;
      },
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
