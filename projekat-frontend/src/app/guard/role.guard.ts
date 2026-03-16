import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth-service";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRoles: string[] = route.data['expectedRoles'] || [];

    if (expectedRoles.length === 0) {
      return true;
    }

    const hasRequiredRole = expectedRoles.some(role => this.authService.hasRole(role));

    if (!hasRequiredRole) {
      alert('Nemate ovlašćenje za pristup ovoj stranici.');
      this.router.navigate(['']); 
      return false;
    }

    return true;
  }
}