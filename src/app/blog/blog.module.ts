import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { DiscoverComponent } from './discover/discover.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogEditorComponent } from './blog-editor/blog-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OneBlogComponent } from './one-blog/one-blog.component';

@NgModule({
  declarations: [
    BlogComponent,
    DiscoverComponent,
    ProfileComponent,
    BlogEditorComponent,
    OneBlogComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule
  ],
})
export class BlogModule {}
