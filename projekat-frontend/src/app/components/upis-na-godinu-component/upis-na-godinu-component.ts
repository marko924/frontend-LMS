import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { StatusZahteva } from '../../models/status-zahteva.enum';
import { Fakultet } from '../../models/fakultet';
import { StudijskiProgram } from '../../models/studijski-program';
import { GodinaStudija } from '../../models/godina-studija'; 
import { FakultetService } from '../../services/fakultet-service';
import { StudijskiProgramService } from '../../services/studijski-program-service';
import { ZahtevZaUpisService } from '../../services/zahtev-za-upis-service';
import { GodinaStudijaService } from '../../services/godina-studija-service'; 
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-upis-na-godinu-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './upis-na-godinu-component.html',
  styleUrl: './upis-na-godinu-component.css',
})
export class UpisNaGodinuComponent implements OnInit {
  forma!: FormGroup;
  fakulteti$!: Observable<Fakultet[]>;
  sveGodine: GodinaStudija[] = []; 
  sviProgrami: StudijskiProgram[] = [];
  filtriraniProgrami: StudijskiProgram[] = [];
  
  podaciZaPrikaz: any = null;
  studentId!: number;

  constructor(
    private fb: FormBuilder,
    private fakultetService: FakultetService,
    private studijskiProgramService: StudijskiProgramService,
    private zahtevService: ZahtevZaUpisService,
    private godinaStudijaService: GodinaStudijaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.studentId = this.authService.getLoggedInUserId();
    this.inicijalizujFormu(this.studentId);
    this.ucitajPodatke();
    this.proveriStatus();
  }

  private inicijalizujFormu(id: number): void {
    this.forma = this.fb.group({
      fakultetId: ['', Validators.required],
      studijskiProgramId: ['', Validators.required],
      studentId: [id, Validators.required],
      godinaStudijaId: ['', Validators.required],
      napomena: ['']
    });
  }

  private ucitajPodatke(): void {
    this.fakulteti$ = this.fakultetService.getAllWithoutPagination();
    this.godinaStudijaService.getAllWithoutPagination().subscribe(res => this.sveGodine = res);
    this.studijskiProgramService.getAllWithoutPagination().subscribe(res => {
      this.sviProgrami = res;
      if (this.podaciZaPrikaz) this.proveriStatus();
    });
  }

  proveriStatus(): void {
    this.zahtevService.getAllWithoutPagination().subscribe(zahtevi => {
      const mojZahtev = zahtevi
        .filter(z => z.studentId === this.studentId)
        .sort((a, b) => b.id - a.id)[0];

      if (mojZahtev) {
        this.azurirajPrikaz(mojZahtev);
      }
    });
  }

  private azurirajPrikaz(zahtev: any): void {
  

  const god = this.sveGodine.find(g => Number(g.id) === Number(zahtev.godinaStudijaId));
  const smer = this.sviProgrami.find(p => Number(p.id) === Number(zahtev.studijskiProgramId));

  this.podaciZaPrikaz = {
    status: zahtev.status,
    godinaBroj: god ? god.godina : '',
    smerNaziv: smer ? smer.naziv : 'Smer nije pronađen' 
  };
}

  onFakultetChange(): void {
    const fId = Number(this.forma.value.fakultetId);
    this.filtriraniProgrami = this.sviProgrami.filter(p => p.fakultetId === fId);
    this.forma.patchValue({ studijskiProgramId: '' });
  }

  sacuvaj(): void {
    if (this.forma.valid) {
      const dto = {
        ...this.forma.value,
        fakultetId: Number(this.forma.value.fakultetId),
        studijskiProgramId: Number(this.forma.value.studijskiProgramId),
        godinaStudijaId: Number(this.forma.value.godinaStudijaId),
        status: StatusZahteva.NA_CEKANJU,
        vremePodnosenja: new Date().toISOString()
      };

      console.log('Slanje zahteva:', dto);
     

      this.zahtevService.postaviZahtev(dto).subscribe({
        next: (res) => {
          this.azurirajPrikaz(res);
        },
        error: () => alert("Greška pri slanju.")
      });
    }
  }

  pokusajPonovo(): void {
    this.podaciZaPrikaz = null;
    this.forma.reset({ studentId: this.studentId });
    this.filtriraniProgrami = [];
  }
}