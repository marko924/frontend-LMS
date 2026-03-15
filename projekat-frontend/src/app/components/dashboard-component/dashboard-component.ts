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
  userRole: string = '';
  currentUsername: string = 'Student';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
    switch (this.userRole) {
      case 'ROLE_NASTAVNIK':
        this.currentUsername = 'Nastavnik'
        break;
      case 'ROLE_ADMIN':
        this.currentUsername = 'Administrator'
        break;
      case 'ROLE_SLUZBA':
        this.currentUsername = 'Osoblje sluzbe'
        break;
      default:
        this.currentUsername = 'Student';
        break;
    }
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