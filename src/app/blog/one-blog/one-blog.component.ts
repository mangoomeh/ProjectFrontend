import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-one-blog',
  templateUrl: './one-blog.component.html',
  styleUrls: ['./one-blog.component.scss'],
})
export class OneBlogComponent implements OnInit {
  public blogDetails: any;
  public baseApiUrl: string = ""
  public comments: any[] = [];

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.baseApiUrl = this.baseService.baseApiUrl;
    this.blogService
      .getBlog(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.blogDetails = res;
        }
      });
  }

  dateParser(date: string) {
    const dateTime = new Date(date);
    return dateTime.toLocaleString();
  }
}
