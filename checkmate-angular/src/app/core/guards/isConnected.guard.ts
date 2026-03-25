import {AuthService} from '@core/services/auth.service';
import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';


export const isAuthenticated: CanActivateFn = (route, state)=>{
  const authService = inject(AuthService);
  const router = inject(Router);
  const isConnected = authService.isConnected ();
  if(isConnected) {
    //si utilisateur co
    return true;
  }
  //si utilisateur pas co
  //redirection Login
  router.navigate(['/','auth','login']);
  return false;
};
