import { CanActivateFn, Router } from '@angular/router';
import { AccessRoute, AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService)
  let accessRoute : AccessRoute = authService.hasAccess()
  if (route.url[0].path != accessRoute.route && accessRoute.access){
    const router: Router = inject(Router)
    router.navigate(["/"+accessRoute.route])
  }

  return accessRoute.access
};





