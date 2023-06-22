import { Component } from '@angular/core';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  loggedIn$ = this.tokenService.loggedIn;
  currentUsername$ = this.userService.currentUserInfo$.pipe(
    map(({ username }) => username)
  );

  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  onLogoutClick() {
    this.tokenService.clear();
    this.router.navigate(['/login']);
  }
}
