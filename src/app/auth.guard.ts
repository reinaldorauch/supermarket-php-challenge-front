import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  UrlSegmentGroup,
  UrlTree,
} from '@angular/router';
import { TokenService } from './token.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (!inject(TokenService).token) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};
