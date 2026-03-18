import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  //Funkcija za poziv login-a koja prima AuthRequest (korisnickoIme i lozinku)
  login(credentials: AuthRequest) {
    //Ocekujem povratnu informaciju od backenda gde sa tap funkcijom presrecem taj odgovor
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.jwt); //cim backedn potvrdi da su podaci tacni salje jwt token i
      })                                        //dodaje korisnika u memoriju brauzera da bi korisnik ostao
    );                                          //ulogovan i kada se stranica osvezi
  }

  //Sa ovom funkcijom iz tokena vadim podatak o id-u korisnika koji je ulogovan,
  //ovo radim kako bih mogao da u nekim komponentama ucitam pravog korisnika koji
  //se uspesno prijavio na sistem
  getLoggedInUserId(): number {
    const token = localStorage.getItem('token');
    if (!token) return 0;

    try {
      const decoded: any = jwtDecode(token); //ova funkcija otpakuje token kako bi mogla da procita podatke unutar njega (payload)
      return decoded.userId ? Number(decoded.userId) : 0; //ako u tokenu postoji polje userId pretvara se u broj i vraca
    } catch (error) {
      console.error("Greška pri dekodiranju tokena:", error);
      return 0;
    }
  }

  //Sa ovom funkcijom proveravam ovlascenja korisnika kako bih 
  //mogao da iskoristim RoleGuard da zastitim pristup nekom delu 
  //aplikacije
  hasRole(targetRole: string): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
      try {
        const decoded: any = jwtDecode(token); //token se dekodira i iz payload-a se procitaju podaci
        const roles: string[] = decoded.roles || []; //ubacuje uloge u listu
        return roles.includes(targetRole); //proverava da li se u toj listi nalazi odgovarajuca uloga za pristup stranici
      } catch {
        return false;
      }
  }

  //Koristi se za proveru da li je korisnik idalje ulogovan
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  //Koristi se da se korisnik odloguje sa sistema gde se iz memorije brise podatak o tokenu
  logout() {
    localStorage.removeItem('token');
  }

  //Sluzi za kreiranje novog naloga i ceka poruku od backenda o uspesnosti
  register(userData: RegisterRequest) {
    return this.http.post(`${this.API_URL}/register`, userData, { responseType: 'text' });
  }
}