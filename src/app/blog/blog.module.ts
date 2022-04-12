import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { DiscoverComponent } from './discover/discover.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [BlogComponent, DiscoverComponent, ProfileComponent,],
  imports: [CommonModule, BlogRoutingModule],
})
export class BlogModule {}
