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
    this.godinaStudijaService.getAllWithoutPagination().subscribe(res => this.sveGodine = res);
    this.studijskiProgramService.getAllWithoutPagination().subscribe(res => this.sviProgrami = res);
  }

  onFakultetChange(): void {
    const fId = Number(this.forma.value.fakultetId);
    this.filtriraniProgrami = this.sviProgrami.filter(p => p.fakultetId === fId);
    this.forma.patchValue({ studijskiProgramId: '' });
  }

  sacuvaj(): void {
    if (this.forma.valid) {
      const formVrednosti = this.forma.value;
      const zahtevDto = {
        fakultetId: Number(formVrednosti.fakultetId),
        studentId: Number(formVrednosti.studentId),
        godinaStudijaId: Number(formVrednosti.godinaStudijaId),
        status: StatusZahteva.NA_CEKANJU,
        vremePodnosenja: new Date().toISOString(),
        napomena: formVrednosti.napomena || ''
      };

      this.zahtevService.postaviZahtev(zahtevDto).subscribe({
        next: (odgovor) => {
          const odabranaGodina = this.sveGodine.find(g => g.id === zahtevDto.godinaStudijaId);
          const odabraniSmer = this.sviProgrami.find(p => p.id === Number(formVrednosti.studijskiProgramId));

          
          this.podaciZaPrikaz = {
            status: odgovor.status,
            godinaBroj: odabranaGodina ? odabranaGodina.godina : '',
            smerNaziv: odabraniSmer ? odabraniSmer.naziv : ''
          };
        },
        error: (err) => alert('Greška na serveru.')
      });
    }
  }

  
  pokusajPonovo(): void {
    this.podaciZaPrikaz = null;
  }
}