import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validated: boolean = false;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
      alert('Valid Form');
    } else {
      alert('Invalid Form');
    }
  }
}
