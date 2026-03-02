import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { PrijaviIspitService } from '../../services/prijavi-ispit-service';
import { StudentNaGodiniService } from '../../services/student-na-godini-service';
import { AuthService } from '../../services/auth-service';
import { RealizacijaPredmetaService } from '../../services/realizacija-predmeta-service';
import { EvaluacijaZnanjaService } from '../../services/evaluacija-znanja-service';

@Component({
  selector: 'app-prijavi-ispit',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './prijavi-ispit-component.html',
  styleUrls: ['./prijavi-ispit-component.css']
})
export class PrijaviIspitComponent implements OnInit {
  studentId!: number;
  studentNaGodiniId!: number;
  isUpisan: boolean | null = null;
  
  ispitiZaPrijavu: any[] = [];
  prijavljeniIspiti: any[] = [];

  constructor(
    private prijaviIspitService: PrijaviIspitService,
    private sngService: StudentNaGodiniService,
    private authService: AuthService,
    private realizacijaService: RealizacijaPredmetaService,
    private evaluacijaService: EvaluacijaZnanjaService
  ) {}

  ngOnInit(): void {
    this.studentId = this.authService.getLoggedInUserId();
    if (this.studentId) {
      this.proveriStatusIUpis();
    }
  }

  proveriStatusIUpis(): void {
    this.sngService.getAllWithoutPagination().subscribe((listaSng: any[]) => {
      const mojSng = listaSng.find(s => s.student && Number(s.student.id) === Number(this.studentId));
      
      if (mojSng) {
        this.studentNaGodiniId = mojSng.id;
        this.isUpisan = true;
        this.ucitajSvePodatke();
      } else {
        this.isUpisan = false;
      }
    });
  }

  ucitajSvePodatke(): void {
    
    this.realizacijaService.getAllWithoutPagination().subscribe((sveRealizacije: any[]) => {
      this.evaluacijaService.getAllWithoutPagination().subscribe((sveEvaluacije: any[]) => {
        
        
        this.prijaviIspitService.getDostupniZaStudenta(this.studentNaGodiniId).subscribe((dostupniDTOs: any[]) => {
          this.ispitiZaPrijavu = dostupniDTOs.map(dto => {
            const ev = sveEvaluacije.find(e => Number(e.id) === Number(dto.evaluacijaZnanjaId));
            const real = sveRealizacije.find(r => Number(r.id) === Number(ev?.realizacijaPredmetaId));
            
            return {
              evaluacijaId: dto.evaluacijaZnanjaId,
              nazivEvaluacije: ev?.naziv,
              
              nazivPredmeta: real?.predmet?.naziv || 'Nema naziva',
              espb: real?.predmet?.espb || 0,
              nastavnik: real?.nastavnik ? `${real.nastavnik.ime} ${real.nastavnik.prezime}` : 'Nije dodeljen'
            };
          });
        });

        
        this.prijaviIspitService.getAllWithoutPagination().subscribe((svePrijave: any[]) => {
          const moje = svePrijave.filter(p => Number(p.studentNaGodiniId) === Number(this.studentNaGodiniId));
          
          this.prijavljeniIspiti = moje.map(p => {
            const ev = sveEvaluacije.find(e => Number(e.id) === Number(p.evaluacijaZnanjaId));
            const real = sveRealizacije.find(r => Number(r.id) === Number(ev?.realizacijaPredmetaId));
            
            return {
              nazivEvaluacije: ev?.naziv,
              nazivPredmeta: real?.predmet?.naziv,
              nastavnik: real?.nastavnik ? `${real.nastavnik.ime} ${real.nastavnik.prezime}` : 'Nije dodeljen'
            };
          });
        });
        
      });
    });
  }

  prijavi(ispit: any): void {
    const body: any = {
      studentNaGodiniId: this.studentNaGodiniId,
      evaluacijaZnanjaId: ispit.evaluacijaId
    };

    // POZIV TVOG GENERIC SERVISA (metoda 'create')
    this.prijaviIspitService.create(body).subscribe({
      next: () => {
        alert(`Uspešno prijavljen ispit: ${ispit.nazivPredmeta}`);
        this.ucitajSvePodatke(); // Osveži tabelu
      },
      error: () => alert('Greška pri prijavi ispita.')
    });
  }
}