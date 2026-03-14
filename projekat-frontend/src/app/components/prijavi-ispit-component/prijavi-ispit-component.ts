import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { PrijaviIspitService } from '../../services/prijavi-ispit-service';
import { StudentNaGodiniService } from '../../services/student-na-godini-service';
import { AuthService } from '../../services/auth-service';
import { RealizacijaPredmetaService } from '../../services/realizacija-predmeta-service';
import { EvaluacijaZnanjaService } from '../../services/evaluacija-znanja-service';
import { PredmetService } from '../../services/predmet-service'; 
import { NastavnikService } from '../../services/nastavnik-service';
import { IspitniRokService } from '../../services/ispitni-rok-service';
import { PohadjanjePredmetaService } from '../../services/pohadjanje-predmeta-service';
import { PolaganjeService } from '../../services/polaganje-service'; // DODATO 

import { EvaluacijaZnanja } from '../../models/evaluacija-znanja';
import { PrijaviIspit } from '../../models/prijavi-ispit';
import { RealizacijaPredmeta } from '../../models/realizacija-predmeta';
import { PohadjanjePredmeta } from '../../models/pohadjanje-predmeta';

@Component({
  selector: 'app-prijavi-ispit',
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
    private pohadjanjeService: PohadjanjePredmetaService,
    private polaganjeService: PolaganjeService, 
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
      const mojSng = listaSng.find(s => Number(s.studentId || s.student?.id) === Number(this.studentId));
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
          this.pohadjanjeService.getAllWithoutPagination().subscribe((pohadjanja: any[]) => {
            
           
            const polozeneRealizacijeIds = pohadjanja
              .filter(p => Number(p.studentNaGodiniId) === Number(this.studentNaGodiniId) && Number(p.konacnaOcena) > 5)
              .map(p => Number(p.realizacijaId));

            
            this.predmetiZaPracenje = realizacije
              .filter(r => !polozeneRealizacijeIds.includes(Number(r.id)))
              .map(r => {
                const p = predmeti.find(item => Number(item.id) === Number(r.predmetId));
                let nInfo = 'Nije dodeljen';
                if (r.nastavniciId && r.nastavniciId.length > 0) {
                  const n = nastavnici.find(item => Number(item.id) === Number(r.nastavniciId[0]));
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
    });
  }

  osveziPrijavljeneIspite(): void {
    this.evaluacijaService.getAllWithoutPagination().subscribe((sveEv: EvaluacijaZnanja[]) => {
      this.predmetService.getAllWithoutPagination().subscribe((sviPredmeti: any[]) => {
        this.nastavnikService.getAllWithoutPagination().subscribe((sviNastavnici: any[]) => {
          this.realizacijaService.getAllWithoutPagination().subscribe((sveRealizacije: RealizacijaPredmeta[]) => {
            this.prijaviIspitService.getAllWithoutPagination().subscribe((svePrijave: any[]) => {
              this.polaganjeService.getAllWithoutPagination().subscribe((svaPolaganja: any[]) => {
                
                
                const ocenjeneEvaluacijeIds = svaPolaganja
                  .filter(pol => Number(pol.studentNaGodiniId) === Number(this.studentNaGodiniId))
                  .map(pol => Number(pol.evaluacijaZnanjaId));

                
                const mojeAktivnePrijave = svePrijave.filter(p => 
                  Number(p.studentNaGodiniId) === Number(this.studentNaGodiniId) &&
                  !ocenjeneEvaluacijeIds.includes(Number(p.evaluacijaZnanjaId))
                );

                this.prijavljeniIspiti = mojeAktivnePrijave.map(p => {
                  const ev = sveEv.find(e => Number(e.id) === Number(p.evaluacijaZnanjaId));
                  const realizacija = sveRealizacije.find(r => Number(r.id) === Number(ev?.realizacijaPredmetaId));
                  const predmet = sviPredmeti.find(pr => Number(pr.id) === Number(realizacija?.predmetId));
                  
                  let nInfo = 'Nije dodeljen';
                  if (realizacija?.nastavniciId && realizacija.nastavniciId.length > 0) {
                    const n = sviNastavnici.find(nast => Number(nast.id) === Number(realizacija.nastavniciId[0]));
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
    });
  }

  proveriIPrijavi(realizacija: any): void {
    if (!this.izabraniRokId) {
      alert("Molimo vas da prvo izaberete ispitni rok!");
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

      
      this.polaganjeService.getAllWithoutPagination().subscribe(polaganja => {
        const vecIzlazio = polaganja.some(pol => 
          Number(pol.evaluacijaZnanjaId) === Number(adekvatna.id) && 
          Number(pol.studentNaGodiniId) === Number(this.studentNaGodiniId)
        );

        if (vecIzlazio) {
          alert("Već ste izlazili na ovaj ispit u ovom roku i ne možete ga ponovo prijaviti!");
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
    });
  }

  private izvrsiPrijavu(ev: EvaluacijaZnanja, naziv: string): void {
    const body: PrijaviIspit = {
      studentNaGodiniId: this.studentNaGodiniId,
      evaluacijaZnanjaId: ev.id
    };

    const pohadjanjeBody: PohadjanjePredmeta = {
      studentNaGodiniId: this.studentNaGodiniId,
      realizacijaId: ev.realizacijaPredmetaId,
      konacnaOcena: 0
    };

    this.prijaviIspitService.create(body).subscribe({
      next: () => {
        
        this.pohadjanjeService.create(pohadjanjeBody).subscribe({
          next: () => {
            alert(`Uspešno prijavljen ispit: ${naziv}`);
            this.osveziPrijavljeneIspite();
          },
          error: () => alert("Ispit prijavljen, ali je došlo do greške kod evidencije pohađanja.")
        });
      },
      error: () => alert("Greška pri prijavi ispita.")
    });
  }
}