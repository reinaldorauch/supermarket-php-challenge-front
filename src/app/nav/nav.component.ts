import { Component } from '@angular/core';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  loggedIn$ = this.tokenService.loggedIn;

  constructor(
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  onLogoutClick() {
    this.tokenService.clear();
    this.router.navigate(['/login']);
  }
}
