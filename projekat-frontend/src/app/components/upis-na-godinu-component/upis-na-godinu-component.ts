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
  sveGodine$!: Observable<GodinaStudija[]>;
  sviProgrami: StudijskiProgram[] = [];
  filtriraniProgrami: StudijskiProgram[] = [];

  constructor(
    private fb: FormBuilder,
    private fakultetService: FakultetService,
    private studijskiProgramService: StudijskiProgramService,
    private zahtevService: ZahtevZaUpisService,
    private godinaStudijaService: GodinaStudijaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const ulogovanId = this.authService.getLoggedInUserId();
    
    // LOG 1: Provera ID-a odmah pri učitavanju stranice
    console.log('%c [AUTH] ID ulogovanog korisnika izvučen iz tokena:', 'background: #222; color: #bada55; font-size: 14px; padding: 5px;', ulogovanId);

    this.inicijalizujFormu(ulogovanId);
    this.ucitajPodatke();
  }

  private inicijalizujFormu(studentId: number): void {
    this.forma = this.fb.group({
      fakultetId: ['', Validators.required],
      studijskiProgramId: ['', Validators.required],
      studentId: [studentId, Validators.required],
      godinaStudijaId: ['', Validators.required],
      napomena: ['']
    });
  }

  private ucitajPodatke(): void {
    this.fakulteti$ = this.fakultetService.getAllWithoutPagination();
    this.sveGodine$ = this.godinaStudijaService.getAllWithoutPagination();
    this.studijskiProgramService.getAllWithoutPagination().subscribe(res => this.sviProgrami = res);
  }

  onFakultetChange(): void {
    const fId = Number(this.forma.value.fakultetId);
    this.filtriraniProgrami = this.sviProgrami.filter(p => p.fakultetId === fId);
    this.forma.patchValue({ studijskiProgramId: '' });
  }

  sacuvaj(): void {
    if (this.forma.valid) {
      const zahtevDto = {
        fakultetId: Number(this.forma.value.fakultetId),
        studentId: Number(this.forma.value.studentId),
        godinaStudijaId: Number(this.forma.value.godinaStudijaId),
        status: StatusZahteva.NA_CEKANJU,
        vremePodnosenja: new Date().toISOString(),
        napomena: this.forma.value.napomena || ''
      };

      // LOG 2: Detaljan prikaz objekta koji ide na backend
      console.log('%c [SEND] Šaljem sledeći DTO na backend:', 'color: #ff9900; font-weight: bold;');
      console.table(zahtevDto); // Prikazuje podatke u lepoj tabeli

      this.zahtevService.postaviZahtev(zahtevDto).subscribe({
        next: (response) => {
          // LOG 3: Odgovor sa servera
          console.log('%c [SUCCESS] Zahtev uspešno obrađen na serveru:', 'color: #00ff00; font-weight: bold;', response);
          alert('Zahtev je uspešno podnet!');
          this.resetujFormu();
        },
        error: (err) => {
          // LOG 4: Greška
          console.error('%c [ERROR] Greška pri slanju zahteva:', 'color: #ff0000; font-weight: bold;', err);
          alert('Greška pri slanju zahteva! Pogledaj konzolu za detalje.');
        }
      });
    } else {
      console.warn('%c [WARN] Forma nije validna. Proveri obavezna polja.', 'color: #ffff00;');
    }
  }

  private resetujFormu(): void {
    const sId = this.authService.getLoggedInUserId();
    this.forma.reset({ studentId: sId });
    this.filtriraniProgrami = [];
    console.log('%c [RESET] Forma je resetovana na početne vrednosti.', 'color: #888;');
  }
}