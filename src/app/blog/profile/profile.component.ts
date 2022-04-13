import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  imgFile: any;
  imgUrl: string | ArrayBuffer | null = '';
  editUserForm!: FormGroup;
  userDetails: any;
  userRole: string = '';
  baseApiUrl: string = '';
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private baseService: BaseService
  ) {
    this.baseApiUrl = this.baseService.baseApiUrl + '/';
  }

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
    });
    this.getUserDetails();
    this.userRole = this.authService.getUserRole();
  }

  getUserDetails() {
    this.userService.getUser(this.authService.getUserId()).subscribe({
      next: (res) => {
        console.log(res);
        this.userDetails = res;
        this.editUserForm.controls['fullName'].setValue(res.fullName);
        this.editUserForm.controls['email'].setValue(res.email);
      },
    });
  }

  loadProfileImage(event: any) {
    const maxSize = 100000;
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    let file = event.target.files[0];

    if (file.type.match(/image\/*/) == null) {
      alert('Invalid image file');
      return;
    }

    if (file.size > maxSize) {
      alert(`Max size should be ${maxSize / 1000}kb`);
      // return;
    }

    this.imgFile = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
    };
  }

  onSaveChanges() {
    if (!this.editUserForm.valid) {
      alert('Invalid Information');
      return;
    }
    console.log(this.editUserForm.value);
    const formData = new FormData();
    formData.append("UserDetails", JSON.stringify(this.editUserForm.value));
    formData.append("UserImage", this.imgFile);
    this.userService
      .updateUser(this.authService.getUserId(), formData)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getUserDetails();
        },
      });
  }
}
