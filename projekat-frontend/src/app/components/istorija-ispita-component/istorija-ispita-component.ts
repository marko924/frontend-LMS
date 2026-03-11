import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

// Servisi
import { AuthService } from '../../services/auth-service';
import { PohadjanjePredmetaService } from '../../services/pohadjanje-predmeta-service';
import { RealizacijaPredmetaService } from '../../services/realizacija-predmeta-service';
import { PredmetService } from '../../services/predmet-service';
import { StudentNaGodiniService } from '../../services/student-na-godini-service';
import { PolaganjeService } from '../../services/polaganje-service';
import { EvaluacijaZnanjaService } from '../../services/evaluacija-znanja-service';
import { IspitniRokService } from '../../services/ispitni-rok-service';
import { NastavnikService } from '../../services/nastavnik-service';

@Component({
  selector: 'app-istorija-ispita',
  standalone: true,
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
    private pohadjanjeService: PohadjanjePredmetaService,
    private realizacijaService: RealizacijaPredmetaService,
    private predmetService: PredmetService,
    private sngService: StudentNaGodiniService,
    private polaganjeService: PolaganjeService,
    private evaluacijaService: EvaluacijaZnanjaService,
    private rokService: IspitniRokService,
    private nastavnikService: NastavnikService
  ) {}

  ngOnInit(): void {
    this.studentId = this.authService.getLoggedInUserId();
    this.ucitajIstoriju();
  }

  ucitajIstoriju(): void {
    this.sngService.getAllWithoutPagination().subscribe(sveSng => {
      const mojaSngIds = sveSng.filter(s => s.studentId === this.studentId).map(s => s.id);
      this.pohadjanjeService.getAllWithoutPagination().subscribe(svaPohadjanja => {
        const mojaPohadjanja = svaPohadjanja.filter(p => mojaSngIds.includes(p.studentNaGodiniId));
        this.realizacijaService.getAllWithoutPagination().subscribe(realizacije => {
          this.predmetService.getAllWithoutPagination().subscribe(predmeti => {
            this.polaganjeService.getAllWithoutPagination().subscribe(svaPolaganja => {
              this.evaluacijaService.getAllWithoutPagination().subscribe(evaluacije => {
                this.rokService.getAllWithoutPagination().subscribe(rokovi => {
                  this.nastavnikService.getAllWithoutPagination().subscribe(nastavnici => {
                    
                    
                    const obradjeniPodaci = mojaPohadjanja.map(p => {
                      const realizacija = realizacije.find(r => r.id === p.realizacijaId);
                      const predmet = predmeti.find(pr => pr.id === realizacija?.predmetId);
                      
                      
                      const evIdsZaOvajPredmet = evaluacije
                        .filter(ev => ev.realizacijaPredmetaId === p.realizacijaId)
                        .map(ev => ev.id);

                     
                      const polaganje = svaPolaganja.find(pol => 
                        evIdsZaOvajPredmet.includes(pol.evaluacijaZnanjaId) &&
                        pol.studentNaGodiniId === p.studentNaGodiniId
                      );

                      
                      const konkretnaEv = evaluacije.find(e => e.id === polaganje?.evaluacijaZnanjaId);
                      const rok = rokovi.find(r => r.id === konkretnaEv?.ispitniRokId);
                      
                      
                      const nId = realizacija?.nastavniciId?.[0];
                      const n = nastavnici.find(nas => nas.id === nId);

                      return {
                        nazivPredmeta: predmet?.naziv || 'Nepoznat predmet',
                        brojPoena: polaganje ? polaganje.osvojeniBodovi : 0,
                        ocena: p.konacnaOcena || 5,
                        nastavnik: n ? `${n.ime} ${n.prezime}` : 'Nema podataka',
                        ispitniRok: rok?.naziv || 'Nije polagano',
                        datum: konkretnaEv?.vremePocetka ? new Date(konkretnaEv.vremePocetka).toLocaleDateString('sr-RS') : '/'
                      };
                    });

                    
                    this.polozeniIspiti = obradjeniPodaci.filter(i => i.ocena >= 6);
                    this.neuspesnaPolaganja = obradjeniPodaci.filter(i => i.ocena < 6);
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