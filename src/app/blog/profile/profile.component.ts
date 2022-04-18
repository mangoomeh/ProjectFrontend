import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // user
  public userId: number = -1;

  // page information
  public routeId: number = -1;

  // fetched Data
  public fetchedUserObj: any;

  // edit user
  public editUserForm!: FormGroup;
  public profileImgFile: any;
  public profileImgUrl: string | ArrayBuffer | null = '';
  public baseApiUrl: string = '';
  public roleName: string = '';
  public userObj = {
    fullName: '',
    email: '',
    profileImgUrl: '',
  };
  public changePasswordForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private baseService: BaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.route.paramMap.subscribe((paramMap) => {
      this.routeId = Number(paramMap.get('id'));
      this.getUserDetails();
    });
    this.editUserForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
    });
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
    this.roleName = this.authService.getUserRole();
    this.baseApiUrl = this.baseService.baseApiUrl + '/';
  }

  getUserDetails() {
    this.userService.getUser(this.routeId).subscribe({
      next: (res) => {
        this.fetchedUserObj = res;
        if (res.profileImgUrl) {
          this.profileImgUrl =
            this.baseService.baseApiUrl + '/' + res.profileImgUrl;
        }
        this.editUserForm.controls['fullName'].setValue(res.fullName);
        this.editUserForm.controls['email'].setValue(res.email);
      },
    });
  }

  loadProfileImage(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    let file = event.target.files[0];

    if (file.type.match(/image\/*/) == null) {
      alert('Invalid image file');
      return;
    }

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

  onSubmitPassword() {
    if (!this.changePasswordForm.valid) {
      alert('password invalid');
      return;
    }
    this.userService
      .changePassword(
        this.authService.getUserId(),
        this.changePasswordForm.value
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          alert('password changed!');
          document.getElementById('passwordChangeModel-close')?.click();
        },
      });
  }
}
