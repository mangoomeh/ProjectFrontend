import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { DiscoverComponent } from './discover/discover.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BlogComponent, DiscoverComponent, ProfileComponent,],
  imports: [CommonModule, BlogRoutingModule, ReactiveFormsModule],
})
export class BlogModule {}
