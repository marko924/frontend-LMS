import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth-service";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  //Ovaj kod mi sluzi za proveru uloga korisnika (ko je korisnik) i da li mu je dozvoljeno da 
  //vidi odredjene stranice pre nego sto mu angular dozvoli da udje na nju

  //CanActivate sluzi da pri svakom pokusaju pristupanju zasticenoj ruti angular pita da li 
  //taj korisnik sme da prodje

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    //Prvo gledamo da li je korisnik uopse prosao prijavu
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    //Vadim listu uloga u podesavanjima rute
    const expectedRoles: string[] = route.data['expectedRoles'] || [];

    //Ako nismo naveli nista to znaci da je stranica javna
    if (expectedRoles.length === 0) {
      return true;
    }

    //Ovde proveravamo da li prijavljeni korisnik ima makar jednu od navedenih uloga u zastiti rute
    const hasRequiredRole = expectedRoles.some(role => this.authService.hasRole(role));

    //Ako korisnik nema nijednu od njih onda ga vraca na njegovu pocetnu stranicu
    if (!hasRequiredRole) {
      alert('Nemate ovlašćenje za pristup ovoj stranici.');
      this.router.navigate(['/dashboard']); 
      return false;
    }

    return true;
  }
}