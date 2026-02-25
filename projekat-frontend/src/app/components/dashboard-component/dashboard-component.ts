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
  currentUsername: string = 'Korisnik';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Uzimamo ulogu iz servisa (koji dekodira JWT)
    this.userRole = this.authService.getRole();
    
    // Opciono: mozes dodati metodu u AuthService da izvuče i username iz tokena
    // this.currentUsername = this.authService.getUsername();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}