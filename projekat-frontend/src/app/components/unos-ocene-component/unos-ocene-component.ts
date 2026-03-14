import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth-service';
import { RealizacijaPredmetaService } from '../../services/realizacija-predmeta-service';
import { IspitniRokService } from '../../services/ispitni-rok-service';
import { PohadjanjePredmetaService } from '../../services/pohadjanje-predmeta-service';
import { PredmetService } from '../../services/predmet-service';
import { StudentNaGodiniService } from '../../services/student-na-godini-service';
import { StudentService } from '../../services/student-service';
import { EvaluacijaZnanjaService } from '../../services/evaluacija-znanja-service';
import { PrijaviIspitService } from '../../services/prijavi-ispit-service';
import { PolaganjeService } from '../../services/polaganje-service';

import { PohadjanjePredmeta } from '../../models/pohadjanje-predmeta';
import { RealizacijaPredmeta } from '../../models/realizacija-predmeta';
import { EvaluacijaZnanja } from '../../models/evaluacija-znanja';
import { Polaganje } from '../../models/polaganje';

@Component({
  selector: 'app-unos-ocene-component',
  imports: [
    CommonModule, FormsModule, MatCardModule, MatFormFieldModule, 
    MatSelectModule, MatTableModule, MatInputModule, MatButtonModule, MatSnackBarModule
  ],
  templateUrl: './unos-ocene-component.html',
  styleUrl: './unos-ocene-component.css',
})
export class UnosOceneComponent implements OnInit {
  nastavnikId!: number;
  rokovi: any[] = [];
  mojeRealizacije: any[] = [];
  izabraniRokId: number | null = null;
  izabranaRealizacijaId: number | null = null;
  studentiZaOcenjivanje: any[] = [];

  constructor(
    private authService: AuthService,
    private realizacijaService: RealizacijaPredmetaService,
    private ispitniRokService: IspitniRokService,
    private pohadjanjeService: PohadjanjePredmetaService,
    private predmetService: PredmetService,
    private sngService: StudentNaGodiniService,
    private studentService: StudentService,
    private evaluacijaService: EvaluacijaZnanjaService,
    private prijaviIspitService: PrijaviIspitService,
    private polaganjeService: PolaganjeService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.nastavnikId = this.authService.getLoggedInUserId();
    this.ucitajPocetnePodatke();
  }

  ucitajPocetnePodatke(): void {
    this.ispitniRokService.getAllWithoutPagination().subscribe(res => this.rokovi = res);
    this.realizacijaService.getAllWithoutPagination().subscribe((realizacije: RealizacijaPredmeta[]) => {
      this.predmetService.getAllWithoutPagination().subscribe(predmeti => {
        this.mojeRealizacije = realizacije
          .filter(r => r.nastavniciId?.includes(this.nastavnikId))
          .map(r => ({
            id: r.id,
            naziv: predmeti.find(p => p.id === r.predmetId)?.naziv || 'Nepoznat predmet'
          }));
      });
    });
  }

  izracunajOcenu(red: any): void {
    const p = red.osvojeniBodovi;
    if (p >= 91) red.ocena = 10;
    else if (p >= 81) red.ocena = 9;
    else if (p >= 71) red.ocena = 8;
    else if (p >= 61) red.ocena = 7;
    else if (p >= 51) red.ocena = 6;
    else red.ocena = 5;
  }

  onFilterChange(): void {
    if (!this.izabraniRokId || !this.izabranaRealizacijaId) return;

    this.evaluacijaService.getAllWithoutPagination().subscribe((evaluacije: EvaluacijaZnanja[]) => {
      const adekvatnaEvaluacija = evaluacije.find(e => 
        Number(e.ispitniRokId) === Number(this.izabraniRokId) && 
        Number(e.realizacijaPredmetaId) === Number(this.izabranaRealizacijaId)
      );

      if (!adekvatnaEvaluacija) {
        this.studentiZaOcenjivanje = [];
        return;
      }

      this.prijaviIspitService.getAllWithoutPagination().subscribe(svePrijave => {
        
        const prijaveURoku = svePrijave.filter(p => Number(p.evaluacijaZnanjaId) === Number(adekvatnaEvaluacija.id));

        this.polaganjeService.getAllWithoutPagination().subscribe(svaPolaganja => {
         
          const ocenjeniURokuIds = svaPolaganja
            .filter(pol => Number(pol.evaluacijaZnanjaId) === Number(adekvatnaEvaluacija.id))
            .map(pol => Number(pol.studentNaGodiniId));

          this.pohadjanjeService.getAllWithoutPagination().subscribe(svaPohadjanja => {
            this.sngService.getAllWithoutPagination().subscribe(sveSng => {
              this.studentService.getAllWithoutPagination().subscribe(sviStudenti => {
                
                const privremena: any[] = [];

                for (const prijava of prijaveURoku) {
                  const sId = Number(prijava.studentNaGodiniId);

                  
                  if (ocenjeniURokuIds.includes(sId)) continue;

                 
                  const vecDodat = privremena.find(item => Number(item.studentNaGodiniId) === sId);
                  if (vecDodat) continue;

                 
                  const pohadjanje = svaPohadjanja.find(p => 
                    Number(p.studentNaGodiniId) === sId && 
                    Number(p.realizacijaId) === Number(this.izabranaRealizacijaId)
                  );

                  
                  if (pohadjanje && pohadjanje.konacnaOcena >= 6) continue;

                  if (pohadjanje) {
                    const sng = sveSng.find(s => Number(s.id) === sId);
                    const student = sviStudenti.find(s => Number(s.id) === Number(sng?.studentId));

                    privremena.push({
                      pohadjanjeId: pohadjanje.id,
                      imePrezime: student ? `${student.ime} ${student.prezime}` : 'Nepoznat student',
                      brojIndeksa: sng?.brojIndeksa || 'Nema indeksa',
                      ocena: 5,
                      osvojeniBodovi: 0,
                      studentNaGodiniId: sId,
                      evaluacijaZnanjaId: adekvatnaEvaluacija.id,
                      realizacijaId: pohadjanje.realizacijaId 
                    });
                  }
                }

                this.studentiZaOcenjivanje = privremena;
                this.cdr.detectChanges();
              });
            });
          });
        });
      });
    });
  }

  sacuvajOcenu(red: any): void {
    if (!this.izabranaRealizacijaId || !red.pohadjanjeId || !this.izabraniRokId) return;

    this.evaluacijaService.getAllWithoutPagination().subscribe((evaluacije: EvaluacijaZnanja[]) => {
      const ispit = evaluacije.find(e => 
        Number(e.ispitniRokId) === Number(this.izabraniRokId) && 
        Number(e.realizacijaPredmetaId) === Number(this.izabranaRealizacijaId)
      );

      if (ispit && ispit.vremePocetka) {
        const razlikaUDanima = (new Date().getTime() - new Date(ispit.vremePocetka).getTime()) / (1000 * 60 * 60 * 24);
        if (razlikaUDanima > 15) {
          this.snackBar.open('Rok za unos ocene je istekao.', 'Zatvori', { duration: 5000 });
          return;
        }
      }

      const novoPolaganje: Polaganje = {
        osvojeniBodovi: red.osvojeniBodovi,
        napomena: 'Unos ocene',
        evaluacijaZnanjaId: red.evaluacijaZnanjaId,
        studentNaGodiniId: red.studentNaGodiniId 
      };

      this.polaganjeService.create(novoPolaganje).subscribe({
        next: () => {
          const azuriranoPohadjanje: PohadjanjePredmeta = {
            id: red.pohadjanjeId,
            konacnaOcena: red.ocena,
            studentNaGodiniId: red.studentNaGodiniId,
            realizacijaId: red.realizacijaId
          };

          this.pohadjanjeService.update(red.pohadjanjeId, azuriranoPohadjanje).subscribe({
            next: () => {
              this.snackBar.open(`Uspešno evidentirano!`, 'OK', { duration: 3000 });
              this.studentiZaOcenjivanje = this.studentiZaOcenjivanje.filter(s => s.pohadjanjeId !== red.pohadjanjeId);
              this.cdr.detectChanges();
            }
          });
        }
      });
    });
  }
}