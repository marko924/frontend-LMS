import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Servisi
import { AuthService } from '../../services/auth-service';
import { RealizacijaPredmetaService } from '../../services/realizacija-predmeta-service';
import { IspitniRokService } from '../../services/ispitni-rok-service';
import { PohadjanjePredmetaService } from '../../services/pohadjanje-predmeta-service';
import { PredmetService } from '../../services/predmet-service';
import { StudentNaGodiniService } from '../../services/student-na-godini-service';
import { StudentService } from '../../services/student-service';
import { EvaluacijaZnanjaService } from '../../services/evaluacija-znanja-service';
import { PrijaviIspitService } from '../../services/prijavi-ispit-service';

// Modeli
import { PohadjanjePredmeta } from '../../models/pohadjanje-predmeta';
import { RealizacijaPredmeta } from '../../models/realizacija-predmeta';
import { EvaluacijaZnanja } from '../../models/evaluacija-znanja';

@Component({
  selector: 'app-unos-ocene-component',
  standalone: true,
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

  onFilterChange(): void {
  if (!this.izabraniRokId || !this.izabranaRealizacijaId) return;

  // 1. Prvo nađi evaluaciju za taj rok i predmet
  this.evaluacijaService.getAllWithoutPagination().subscribe((evaluacije: EvaluacijaZnanja[]) => {
    const adekvatnaEvaluacija = evaluacije.find(e => 
      Number(e.ispitniRokId) === Number(this.izabraniRokId) && 
      Number(e.realizacijaPredmetaId) === Number(this.izabranaRealizacijaId)
    );

    if (!adekvatnaEvaluacija) {
      this.studentiZaOcenjivanje = [];
      this.snackBar.open('Nije definisan ispit za ovaj rok i predmet.', 'Zatvori', { duration: 3000 });
      return;
    }

    // 2. Dohvati sve prijave ispita
    this.prijaviIspitService.getAllWithoutPagination().subscribe(svePrijave => {
      const prijaveZaOvajIspit = svePrijave.filter(prijava => 
        Number(prijava.evaluacijaZnanjaId) === Number(adekvatnaEvaluacija.id)
      );

      
      const idStudentaKojiSuPrijavili = prijaveZaOvajIspit.map(p => p.studentNaGodiniId);

      
      this.pohadjanjeService.getAllWithoutPagination().subscribe(svaPohadjanja => {
        const pohadjanjaStudenataSaPrijavom = svaPohadjanja.filter(p => 
          p.realizacijaId === this.izabranaRealizacijaId && 
          idStudentaKojiSuPrijavili.includes(p.studentNaGodiniId) &&
          (p.konacnaOcena === null || p.konacnaOcena === 0) 
        );

        
        this.sngService.getAllWithoutPagination().subscribe(sveSng => {
          this.studentService.getAllWithoutPagination().subscribe(sviStudenti => {
            
            this.studentiZaOcenjivanje = pohadjanjaStudenataSaPrijavom.map(p => {
              const sng = sveSng.find(s => s.id === p.studentNaGodiniId);
              const student = sviStudenti.find(s => s.id === sng?.studentId);
              
              return {
                pohadjanjeId: p.id,
                imePrezime: student ? `${student.ime} ${student.prezime}` : 'Nepoznat student',
                brojIndeksa: sng?.brojIndeksa || 'Nema indeksa',
                ocena: p.konacnaOcena || null,
                studentNaGodiniId: p.studentNaGodiniId
              };
            });
            this.cdr.detectChanges();
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
        const datumIspita = new Date(ispit.vremePocetka);
        const danas = new Date();
        const razlikaUMilisekundama = danas.getTime() - datumIspita.getTime();
        const razlikaUDanima = razlikaUMilisekundama / (1000 * 60 * 60 * 24);

        if (razlikaUDanima > 15) {
          this.snackBar.open('Rok za unos ocene je istekao (prošlo je više od 15 dana).', 'Zatvori', { duration: 5000 });
          return;
        }
      }

      
      const body: PohadjanjePredmeta = {
        id: red.pohadjanjeId,
        konacnaOcena: red.ocena,
        studentNaGodiniId: red.studentNaGodiniId,
        realizacijaId: this.izabranaRealizacijaId as number
      };

      this.pohadjanjeService.update(body.id!, body).subscribe({
        next: () => {
          this.snackBar.open(`Uspešno uneta ocena za: ${red.imePrezime}`, 'OK', { duration: 2000 });
          this.studentiZaOcenjivanje = this.studentiZaOcenjivanje.filter(s => s.pohadjanjeId !== red.pohadjanjeId);
          this.cdr.detectChanges();
        },
        error: () => this.snackBar.open('Greška pri čuvanju na serveru.', 'Zatvori')
      });
    });
  }
}