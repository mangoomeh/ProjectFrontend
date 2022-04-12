import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { DiscoverComponent } from './discover/discover.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      { path: '', redirectTo: 'discover', pathMatch: 'full' },
      { path: 'discover', component: DiscoverComponent },
      { path: 'profile', component: DiscoverComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
