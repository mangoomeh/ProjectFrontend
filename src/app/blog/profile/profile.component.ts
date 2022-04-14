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
  editUserForm!: FormGroup;
  profileImgFile: any;
  profileImgUrl: string | ArrayBuffer | null = '';
  baseApiUrl: string = ""
  fetchedUserObj: any;
  roleName: string = '';
  userObj = {
    fullName: '',
    email: '',
    profileImgUrl: '',
  };

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
    });
    this.getUserDetails();
    this.roleName = this.authService.getUserRole();
    this.baseApiUrl = this.baseService.baseApiUrl + "/"
  }

  getUserDetails() {
    this.userService.getUser(this.authService.getUserId()).subscribe({
      next: (res) => {
        this.fetchedUserObj = res;
        this.profileImgUrl =
          this.baseService.baseApiUrl + '/' + res.profileImgUrl;
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

    // if (file.size > maxSize) {
    //   alert(`Max size should be ${maxSize / 1000}kb`);
    //   return;
    // }

    this.profileImgFile = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.profileImgUrl = reader.result;
    };
  }

  onSaveChanges() {
    if (!this.editUserForm.valid) {
      alert('Invalid Information');
      return;
    }
    const formData = new FormData();
    this.userObj.fullName = this.editUserForm.value.fullName;
    this.userObj.email = this.editUserForm.value.email;
    this.userObj.profileImgUrl = this.fetchedUserObj.profileImgUrl;
    formData.append('UserDetails', JSON.stringify(this.userObj));
    formData.append('UserImage', this.profileImgFile);
    this.userService
      .updateUser(this.authService.getUserId(), formData)
      .subscribe({
        next: (res) => {
          this.getUserDetails();
          document.getElementById('close-modal')?.click();
        },
      });
  }
}
