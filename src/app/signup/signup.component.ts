import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  public imgFile: any;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private router: Router
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
    formData.append("UserDetails", JSON.stringify(this.signupForm.value));
    formData.append("UserImage", this.imgFile)
    this.userService.addUser(formData).subscribe({
      next: (res) => {
        console.log(res);
        alert("Account created!");
        this.router.navigate(['/login'])
      }
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

    this.imgFile = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
    };
  }
}
