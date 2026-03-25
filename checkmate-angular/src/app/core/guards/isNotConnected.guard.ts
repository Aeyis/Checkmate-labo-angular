import {AuthService} from '@core/services/auth.service';
import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';


export const isNotConnectedGuard: CanActivateFn = (route, state)=>{
  const authService = inject(AuthService);
  const router = inject(Router);
  const isConnected = authService.isConnected();
  if(!isConnected) {
    //si utilisateur pas co
    return true;
  }
  //si utilisateur co -> redirection home
  router.navigate(['/']);
  return false;
};
