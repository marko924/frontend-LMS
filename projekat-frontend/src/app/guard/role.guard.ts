import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth-service";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
  const expectedRoles: string[] = route.data['expectedRoles'] || [];
  const currentRole = this.authService.getRole();

  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/login']);
    return false;
  }

  if (expectedRoles.length > 0 && !expectedRoles.includes(currentRole)) {
    this.router.navigate(['/login']);
    return false;
  }

  return true;
}
}