import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

// Servisi
import { PrijaviIspitService } from '../../services/prijavi-ispit-service';
import { StudentNaGodiniService } from '../../services/student-na-godini-service';
import { AuthService } from '../../services/auth-service';
import { RealizacijaPredmetaService } from '../../services/realizacija-predmeta-service';
import { EvaluacijaZnanjaService } from '../../services/evaluacija-znanja-service';
import { PredmetService } from '../../services/predmet-service'; 
import { NastavnikService } from '../../services/nastavnik-service';
import { IspitniRokService } from '../../services/ispitni-rok-service';
import { PohadjanjePredmetaService } from '../../services/pohadjanje-predmeta-service'; // NOVO

// Modeli
import { EvaluacijaZnanja } from '../../models/evaluacija-znanja';
import { PrijaviIspit } from '../../models/prijavi-ispit';
import { RealizacijaPredmeta } from '../../models/realizacija-predmeta';
import { PohadjanjePredmeta } from '../../models/pohadjanje-predmeta';

@Component({
  selector: 'app-prijavi-ispit',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatButtonModule, 
    MatTableModule, MatIconModule, MatListModule, MatSelectModule, MatFormFieldModule
  ],
  templateUrl: './prijavi-ispit-component.html',
  styleUrls: ['./prijavi-ispit-component.css']
})
export class PrijaviIspitComponent implements OnInit {
  studentId!: number;
  studentNaGodiniId!: number;
  isUpisan: boolean | null = null;
  
  ispitniRokovi: any[] = [];
  izabraniRokId: number | null = null; 
  
  predmetiZaPracenje: any[] = []; 
  prijavljeniIspiti: any[] = []; 

  constructor(
    private prijaviIspitService: PrijaviIspitService,
    private sngService: StudentNaGodiniService,
    private authService: AuthService,
    private realizacijaService: RealizacijaPredmetaService,
    private evaluacijaService: EvaluacijaZnanjaService,
    private predmetService: PredmetService,
    private nastavnikService: NastavnikService,
    private ispitniRokService: IspitniRokService,
    private pohadjanjeService: PohadjanjePredmetaService, // DODATO
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.studentId = this.authService.getLoggedInUserId();
    if (this.studentId) {
      this.ucitajRokove();
      this.proveriStatusIUpis();
    }
  }

  ucitajRokove(): void {
    this.ispitniRokService.getAllWithoutPagination().subscribe(rokova => {
      this.ispitniRokovi = rokova;
    });
  }

  proveriStatusIUpis(): void {
    this.sngService.getAllWithoutPagination().subscribe((listaSng: any[]) => {
      const mojSng = listaSng.find(s => (s.studentId || s.student?.id) === this.studentId);
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
    this.realizacijaService.getAllWithoutPagination().subscribe((realizacije: RealizacijaPredmeta[]) => {
      this.predmetService.getAllWithoutPagination().subscribe((predmeti: any[]) => {
        this.nastavnikService.getAllWithoutPagination().subscribe((nastavnici: any[]) => {
          
          this.predmetiZaPracenje = realizacije.map(r => {
            const p = predmeti.find(item => item.id === r.predmetId);
            let nInfo = 'Nije dodeljen';
            if (r.nastavniciId && r.nastavniciId.length > 0) {
              const n = nastavnici.find(item => item.id === r.nastavniciId[0]);
              if (n) nInfo = `${n.ime} ${n.prezime}`;
            }

            return {
              id: r.id, 
              nazivPredmeta: p?.naziv || 'Nepoznat',
              espb: p?.espb || 0,
              nastavnik: nInfo
            };
          });

          this.osveziPrijavljeneIspite();
        });
      });
    });
  }

  osveziPrijavljeneIspite(): void {
    this.evaluacijaService.getAllWithoutPagination().subscribe((sveEv: EvaluacijaZnanja[]) => {
      this.predmetService.getAllWithoutPagination().subscribe((sviPredmeti: any[]) => {
        this.nastavnikService.getAllWithoutPagination().subscribe((sviNastavnici: any[]) => {
          this.realizacijaService.getAllWithoutPagination().subscribe((sveRealizacije: RealizacijaPredmeta[]) => {
            this.prijaviIspitService.getAllWithoutPagination().subscribe((svePrijave: any[]) => {
              
              const moje = svePrijave.filter(p => Number(p.studentNaGodiniId) === Number(this.studentNaGodiniId));

              this.prijavljeniIspiti = moje.map(p => {
                const ev = sveEv.find(e => e.id === p.evaluacijaZnanjaId);
                const realizacija = sveRealizacije.find(r => r.id === ev?.realizacijaPredmetaId);
                const predmet = sviPredmeti.find(pr => pr.id === realizacija?.predmetId);
                
                let nInfo = 'Nije dodeljen';
                if (realizacija?.nastavniciId && realizacija.nastavniciId.length > 0) {
                  const n = sviNastavnici.find(nast => nast.id === realizacija.nastavniciId[0]);
                  if (n) nInfo = `${n.ime} ${n.prezime}`;
                }

                return {
                  nazivPredmeta: predmet?.naziv || 'Nepoznat',
                  espb: predmet?.espb || 0,
                  nastavnik: nInfo,
                  datum: ev?.vremePocetka
                };
              });
              this.cdr.detectChanges();
            });
          });
        });
      });
    });
  }

  proveriIPrijavi(realizacija: any): void {
    if (!this.izabraniRokId) {
      alert("Molimo vas da prvo izaberete ispitni rok u meniju iznad!");
      return;
    }

    this.evaluacijaService.getAllWithoutPagination().subscribe((sveEvaluacije: EvaluacijaZnanja[]) => {
      const adekvatna = sveEvaluacije.find(e => 
        Number(e.realizacijaPredmetaId) === Number(realizacija.id) && 
        Number(e.ispitniRokId) === Number(this.izabraniRokId)
      );

      if (!adekvatna) {
        alert(`Za predmet ${realizacija.nazivPredmeta} nije kreiran ispit u izabranom roku!`);
        return;
      }

      this.prijaviIspitService.getAllWithoutPagination().subscribe(prijave => {
        const vecPrijavljen = prijave.some(p => 
          Number(p.evaluacijaZnanjaId) === Number(adekvatna.id) && 
          Number(p.studentNaGodiniId) === Number(this.studentNaGodiniId)
        );

        if (vecPrijavljen) {
          alert("Već ste prijavili ovaj ispit u ovom roku!");
        } else {
          this.izvrsiPrijavu(adekvatna, realizacija.nazivPredmeta);
        }
      });
    });
  }

 private izvrsiPrijavu(ev: EvaluacijaZnanja, naziv: string): void {
    
    // Kreiramo objekte bez ID polja - TypeScript dozvoljava jer smo stavili 'id?' u modelu
    const body: PrijaviIspit = {
      studentNaGodiniId: this.studentNaGodiniId,
      evaluacijaZnanjaId: ev.id
    };

    const pohadjanjeBody: PohadjanjePredmeta = {
      studentNaGodiniId: this.studentNaGodiniId,
      realizacijaId: ev.realizacijaPredmetaId,
      konacnaOcena: 0
    };

    // 1. Šaljemo prijavu ispita
    this.prijaviIspitService.create(body).subscribe({
      next: (odgovorPrijave: PrijaviIspit) => {
        console.log("Prijava ispita uspešna. Generisani ID:", odgovorPrijave.id);

        // 2. Šaljemo pohađanje predmeta
        this.pohadjanjeService.create(pohadjanjeBody).subscribe({
          next: (odgovorPohadjanja: PohadjanjePredmeta) => {
            console.log("Pohađanje kreirano. Generisani ID:", odgovorPohadjanja.id);
            
            alert(`Uspešno prijavljen ispit: ${naziv}`);
            this.osveziPrijavljeneIspite();
          },
          error: (err) => {
            console.error("Greška kod pohađanja:", err);
            alert("Ispit prijavljen, ali nije kreiran zapis o pohađanju.");
          }
        });
      },
      error: (err) => {
        console.error("Greška kod prijave:", err);
        alert("Greška na serveru.");
      }
    });
  }
}