import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { LoginData } from '../types';
import { MatSnackBar, MatSnackBarAction } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router
  ) {}

  loginGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  async onSubmit() {
    if (!this.loginGroup.valid) {
      this.snackbar.open('Invalid form');
      return;
    }
    try {
      await firstValueFrom(
        this.loginService.login(this.loginGroup.value as LoginData)
      );
      await this.router.navigate(['/cart']);
    } catch (err: any) {
      this.snackbar.open(err.message);
    }
  }
}
