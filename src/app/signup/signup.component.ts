import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../shared/services/role.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public validated: boolean = false;
  public signupForm!: FormGroup;
  public roleList: any;
  public imgUrl: string | ArrayBuffer | null = '';

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe({
      next: (res) => {
        this.roleList = res;
      },
    });
    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      roleId: ['', Validators.required],
    });
  }

  signup() {
    if (!this.signupForm.valid) {
      this.validated = true;
      return;
    }
    this.validated = false;
    let formData = new FormData();
    formData.append("UserDetails", JSON.stringify(this.signupForm.value))
    this.userService.addUser(formData).subscribe({
      next: (res) => {
        console.log(res);
      }
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

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
    };
    console.log(this.signupForm.value);
  }
}
