import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsBloggerGuard } from '../shared/guards/is-blogger.guard';
import { BlogEditorComponent } from './blog-editor/blog-editor.component';
import { BlogComponent } from './blog.component';
import { DiscoverComponent } from './discover/discover.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { OneBlogComponent } from './one-blog/one-blog.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      { path: '', redirectTo: 'discover', pathMatch: 'full' },
      { path: 'discover', component: DiscoverComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'blogEditor/:id',
        component: BlogEditorComponent,
        canActivate: [IsBloggerGuard],
      },
      { path: 'one/:id', component: OneBlogComponent },
      {
        path: 'myBlogs',
        component: MyBlogsComponent,
        canActivate: [IsBloggerGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
