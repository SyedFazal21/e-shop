import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'my-company-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  authError = false;
  authErrorMsg = 'Invalid email or password';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private storageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get loginForm() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    this.auth
      .login(this.loginForm['email'].value, this.loginForm['password'].value)
      .subscribe(
        (user) => {
          this.authError = false;
          this.storageService.setToken(user.token);
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          this.authError = true;
          if (error.status != 404) this.authErrorMsg = 'Error in server';
        }
      );
  }
}
