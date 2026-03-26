import {HttpErrorResponse, HttpInterceptor, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: unknown)=> {
      if(error instanceof HttpErrorResponse){
        switch (error.status){
          case 401:
            authService.logout();
            router.navigate(['/', 'auth', 'login']);
            return throwError(()=> null);
          case 403:
            router.navigate(['/forbidden']); // TODO page 403
            return throwError(()=> null);
          case 500:
            router.navigate(['/']); // TODO page d'erreur 500
            return throwError(()=> null);
        }
      }
      return throwError(()=> error);
    })
  );
};

