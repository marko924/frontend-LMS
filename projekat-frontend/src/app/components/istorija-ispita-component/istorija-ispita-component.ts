import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // DODATO
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { AuthService } from '../../services/auth-service';
import { PolaganjeService } from '../../services/polaganje-service';
import { EvaluacijaZnanjaService } from '../../services/evaluacija-znanja-service';
import { RealizacijaPredmetaService } from '../../services/realizacija-predmeta-service';
import { PredmetService } from '../../services/predmet-service';
import { StudentNaGodiniService } from '../../services/student-na-godini-service';
import { IspitniRokService } from '../../services/ispitni-rok-service';
import { NastavnikService } from '../../services/nastavnik-service';
import { PohadjanjePredmetaService } from '../../services/pohadjanje-predmeta-service';

@Component({
  selector: 'app-istorija-ispita',
  imports: [CommonModule, MatCardModule, MatTableModule, MatTabsModule],
  templateUrl: './istorija-ispita-component.html',
  styleUrl: './istorija-ispita-component.css'
})
export class IstorijaIspitaComponent implements OnInit {
  studentId!: number;
  polozeniIspiti: any[] = [];
  neuspesnaPolaganja: any[] = [];

  constructor(
    private authService: AuthService,
    private polaganjeService: PolaganjeService,
    private evaluacijaService: EvaluacijaZnanjaService,
    private realizacijaService: RealizacijaPredmetaService,
    private predmetService: PredmetService,
    private sngService: StudentNaGodiniService,
    private rokService: IspitniRokService,
    private nastavnikService: NastavnikService,
    private pohadjanjeService: PohadjanjePredmetaService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.studentId = this.authService.getLoggedInUserId();
    this.ucitajIstoriju();
  }

  ucitajIstoriju(): void {
    this.sngService.getAllWithoutPagination().subscribe(sveSng => {
      const mojaSngIds = sveSng
        .filter(s => Number(s.studentId) === Number(this.studentId))
        .map(s => s.id);

      this.polaganjeService.getAllWithoutPagination().subscribe(svaPolaganja => {
        const mojaPolaganja = svaPolaganja.filter(p => mojaSngIds.includes(p.studentNaGodiniId));

        this.evaluacijaService.getAllWithoutPagination().subscribe(evaluacije => {
          this.realizacijaService.getAllWithoutPagination().subscribe(realizacije => {
            this.predmetService.getAllWithoutPagination().subscribe(predmeti => {
              this.rokService.getAllWithoutPagination().subscribe(rokovi => {
                this.nastavnikService.getAllWithoutPagination().subscribe(nastavnici => {
                  this.pohadjanjeService.getAllWithoutPagination().subscribe(svaPohadjanja => {
                    
                    const privremenaLista: any[] = [];

                    for (let pol of mojaPolaganja) {
                      const ev = evaluacije.find(e => Number(e.id) === Number(pol.evaluacijaZnanjaId));
                      const rok = rokovi.find(r => Number(r.id) === Number(ev?.ispitniRokId));
                      const rel = realizacije.find(r => Number(r.id) === Number(ev?.realizacijaPredmetaId));
                      const pred = predmeti.find(pr => Number(pr.id) === Number(rel?.predmetId));
                      
                      const nId = rel?.nastavniciId?.[0];
                      const n = nastavnici.find(nas => Number(nas.id) === Number(nId));

                      let ocenaZaOvajRed = 5;
                      const bodovi = pol.osvojeniBodovi;

                      if (bodovi >= 51) {
                        if (bodovi >= 91) ocenaZaOvajRed = 10;
                        else if (bodovi >= 81) ocenaZaOvajRed = 9;
                        else if (bodovi >= 71) ocenaZaOvajRed = 8;
                        else if (bodovi >= 61) ocenaZaOvajRed = 7;
                        else ocenaZaOvajRed = 6;
                      }

                      privremenaLista.push({
                        nazivPredmeta: pred?.naziv || 'Nepoznat predmet',
                        brojPoena: bodovi,
                        ocena: ocenaZaOvajRed,
                        nastavnik: n ? `${n.ime} ${n.prezime}` : 'Nema podataka',
                        ispitniRok: rok?.naziv || 'Nepoznat rok',
                        datum: ev?.vremePocetka ? new Date(ev.vremePocetka).toLocaleDateString('sr-RS') : '/'
                      });
                    }

                    this.polozeniIspiti = privremenaLista.filter(i => i.ocena >= 6);
                    this.neuspesnaPolaganja = privremenaLista.filter(i => i.ocena < 6);
                    
                    
                    this.cdr.detectChanges(); 
                  });
                });
              });
            });
          });
        });
      });
    });
  }
}