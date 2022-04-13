import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.scss'],
})
export class BlogEditorComponent implements OnInit {
  public Editor = ClassicEditor;
  public blogForm!: FormGroup;
  public blogPost: string = '';
  public localBlogImgUrl: string | ArrayBuffer | null = '';
  public blogImgFile: any;
  public blogId: number = 0;
  public blogDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlog(this.blogId).subscribe({
      next: (res) => {
        console.log(res);
        this.blogDetails = res;
      },
    });
  }

  loadLocalBlogImg(event: any) {
    const maxSize = 100000;
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      this.localBlogImgUrl = '';
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
      this.localBlogImgUrl = reader.result;
    };
  }

  onSaveChanges() {}
}
