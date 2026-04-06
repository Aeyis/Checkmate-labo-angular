import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@core/services/auth.service';

export const adminGuard: CanActivateFn = (route, state)=>{
  const authService=inject(AuthService);
  const router= inject(Router);
  const isAdmin= authService.isAdmin();

  if (isAdmin){
    return true;
  }
  router.navigate(['/forbidden']);
  return false;
}
