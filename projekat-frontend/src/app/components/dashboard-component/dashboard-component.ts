import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule,MatToolbarModule,MatIconModule,MatSidenavModule,MatListModule],
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.css']
})
export class DashboardComponent implements OnInit {
  userRole: string = 'ROLE_STUDENT';
  currentUsername: string = 'Student';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.hasRole('ROLE_ADMIN')) {
      this.currentUsername = 'Administrator';
      this.userRole = 'ROLE_ADMIN';
    } else if (this.authService.hasRole('ROLE_SLUZBA')) {
      this.currentUsername = 'Osoblje sluzbe';
      this.userRole = 'ROLE_SLUZBA';
    } else if (this.authService.hasRole('ROLE_NASTAVNIK')) {
      this.currentUsername = 'Nastavnik';
      this.userRole = 'ROLE_NASTAVNIK';
    } else {
      this.currentUsername = 'Student';
      this.userRole = 'ROLE_STUDENT';
    }
  }

  canAccess(roles: string[]): boolean {
    return roles.some(role => this.authService.hasRole(role));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  goToProfile() {
    const userId = this.authService.getLoggedInUserId();
    this.router.navigate(['/dashboard/profil'], {
      queryParams: { 
        id: userId, 
        uloga: this.userRole 
      }
    });
  }
}