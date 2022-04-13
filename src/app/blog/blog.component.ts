import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public sideBarIsOpen: boolean = false;
  constructor(private router: Router) { }

  toggleSideBar() {
    this.sideBarIsOpen = !this.sideBarIsOpen;
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
