import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

// Servisi
import { PredmetService } from '../../services/predmet-service';
import { ZahtevZaUpisService } from '../../services/zahtev-za-upis-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-moji-predmeti',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './moji-predmeti-component.html',
  styleUrls: ['./moji-predmeti-component.css']
})
export class MojiPredmetiComponent implements OnInit {
  studentId!: number;
  mojiPredmeti: any[] = [];

  constructor(
    private predmetService: PredmetService,
    private zahtevService: ZahtevZaUpisService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.studentId = this.authService.getLoggedInUserId();
    if (this.studentId) {
      this.ucitajPodatke();
    }
  }

  ucitajPodatke(): void {
    
    this.zahtevService.getAllWithoutPagination().subscribe((zahtevi: any[]) => {
      
      
      const mojZahtev = zahtevi
        .filter(z => Number(z.studentId) === Number(this.studentId) && z.status === 'ODOBREN')
        .sort((a, b) => b.id - a.id)[0];

      if (mojZahtev && mojZahtev.studijskiProgramId) {
        const programId = mojZahtev.studijskiProgramId;

        
        this.predmetService.getAllWithoutPagination().subscribe((sviPredmeti: any[]) => {
          
          
          const filtrirani = sviPredmeti.filter(p => Number(p.studijskiProgramId) === Number(programId));
          
         
          this.mojiPredmeti = filtrirani.map(p => {
            return { naziv: p.naziv };
          });
        });

      } else {
        this.mojiPredmeti = [];
      }
    });
  }
}