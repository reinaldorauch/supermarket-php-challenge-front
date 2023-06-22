import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users$ = this.userService.users;

  displayedColumns = ['username', 'name'];

  userForm = this.formBuilder.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.load();
  }

  async onUserSubmit() {
    if (!this.userForm.valid) {
      this.snackbar.open('User data is not valid', undefined, {
        duration: 5000,
      });
      return;
    }

    try {
      await this.userService.create(this.userForm.value);
      this.snackbar.open('User created with success', undefined, {
        duration: 500,
      });
    } catch (err: any) {
      this.snackbar.open(
        err?.error?.error?.description || 'Error when creating user',
        undefined,
        {
          duration: 5000,
        }
      );
    }
  }
}
