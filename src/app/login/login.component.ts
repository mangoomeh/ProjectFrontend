import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validated: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Password: ['', Validators.required],
    });
  }

  onSubmit(event: any) {
    event.preventDefault();
    this.validated = true;
    if (this.loginForm.valid) {
      console.log('loginForm.value', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('jwt_token', res.token);
          this.router.navigate(['/blog']);
        },
      });
    } else {
      alert('Invalid Form');
    }
  }
}
