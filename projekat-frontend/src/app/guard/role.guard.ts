import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth-service";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
  const expectedRoles: string[] = route.data['expectedRoles']; // Niz uloga (npr. ['ROLE_ADMIN', 'ROLE_STUDENT'])
  const currentRole = this.authService.getRole();

  if (!this.authService.isLoggedIn() || !expectedRoles.includes(currentRole)) {
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}
}