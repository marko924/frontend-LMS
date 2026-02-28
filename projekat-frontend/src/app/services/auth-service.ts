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

  login(credentials: AuthRequest) {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.jwt);
      })
    );
  }

  getLoggedInUserId(): number {
    const token = localStorage.getItem('token');
    if (!token) return 0;

    try {
      const decoded: any = jwtDecode(token);
      // 'userId' je ključ koji smo definisali u Javi u JwtUtil klasi
      return decoded.userId ? Number(decoded.userId) : 0;
    } catch (error) {
      console.error("Greška pri dekodiranju tokena:", error);
      return 0;
    }
  }

  getRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    try {
      const decoded: any = jwtDecode(token);
      return decoded.roles ? decoded.roles[0] : '';
    } catch (error) {
      return '';
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(userData: RegisterRequest) {
    return this.http.post(`${this.API_URL}/register`, userData, { responseType: 'text' });
  }
}