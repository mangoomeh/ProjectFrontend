import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.scss'],
})
export class BlogEditorComponent implements OnInit {
  // ckeditor
  public Editor = ClassicEditor;

  // content to be sent to api
  public blogForm!: FormGroup;
  public blogImgFile: any;
  public blogContent: string = '';
  public blogDetails = {
    id: 0,
    userId: 0,
    title: '',
    description: '',
    content: '',
    blogImgUrl: '',
    isVisible: true,
  };
  public isBlogPrivate: boolean = false;

  // misc
  public blogImgUrl: string | ArrayBuffer | null = '';
  public blogId: number = 0;
  public fetchedBlogObj: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private baseService: BaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));
    this.getBlog();
  }

  getBlog() {
    this.blogService.getBlog(this.blogId).subscribe({
      next: (res) => {
        this.fetchedBlogObj = res;
        if (res.userId !== Number(this.authService.getUserId())) {
          alert('You have no rights to edit this blog!');
          this.router.navigate(['/blog']);
        }
        this.blogForm.controls['title'].setValue(res.title);
        this.blogForm.controls['description'].setValue(res.description);
        this.isBlogPrivate = !res.isVisible;
        this.blogContent = res.content;
        if (res.blogImgUrl) {
          this.blogImgUrl = this.baseService.baseApiUrl + '/' + res.blogImgUrl;
        }
      },
    });
  }

  loadLocalBlogImg(event: any) {
    const maxSize = 100000;
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      this.blogImgUrl = '';
      return;
    }
    let file = event.target.files[0];

    if (file.type.match(/image\/*/) == null) {
      alert('Invalid image file');
      return;
    }

    if (file.size > maxSize) {
      alert(`Max size should be ${maxSize / 1000}kb`);
    }

    this.blogImgFile = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.blogImgUrl = reader.result;
    };
  }

  onSaveChanges() {
    if (!this.blogForm.valid) {
      alert('Invalid title or description');
      return;
    }
    this.blogDetails.id = this.blogId;
    this.blogDetails.userId = this.authService.getUserId();
    this.blogDetails.title = this.blogForm.value.title;
    this.blogDetails.description = this.blogForm.value.description;
    this.blogDetails.content = this.blogContent;
    this.blogDetails.blogImgUrl = this.fetchedBlogObj.blogImgUrl;
    this.blogDetails.isVisible = !this.isBlogPrivate;
    const formData = new FormData();
    formData.append('BlogDetails', JSON.stringify(this.blogDetails));
    formData.append('BlogImage', this.blogImgFile);
    this.blogService.updateBlog(formData).subscribe({
      next: (res) => {
        alert('Saved!');
        this.getBlog();
      },
    });
  }

  onDelete() {
    this.blogService.deleteBlog(this.blogId).subscribe({
      next: (res) => {},
    });
    alert('Blog deleted!');
    this.router.navigate(['/blog']);
  }
}
