import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EvaluacijaZnanjaService } from '../../services/evaluacija-znanja-service';
import { HttpErrorResponse } from '@angular/common/http';
import { IspitniRokService } from '../../services/ispitni-rok-service';
import { RealizacijaPredmetaService } from '../../services/realizacija-predmeta-service';
import { InstrumentEvaluacijeService } from '../../services/instrument-evaluacije-service';
import { PredmetService } from '../../services/predmet-service';
import { CommonModule } from '@angular/common';
import { IspitniRok } from '../../models/ispitni-rok';
import { RealizacijaPredmeta } from '../../models/realizacija-predmeta';
import { InstrumentEvaluacije } from '../../models/instrument-evaluacije';
import { Predmet } from '../../models/predmet';
import { EvaluacijaZnanja } from '../../models/evaluacija-znanja';

@Component({
  selector: 'app-zakazivanje-ispita',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zakazivanje-ispita.html',
  styleUrl: './zakazivanje-ispita.css',
})
export class ZakazivanjeIspita implements OnInit {
  
  rokForm!: FormGroup;
  ispitForm!: FormGroup;

  ispitniRokovi: IspitniRok[] = [];
  realizacije: RealizacijaPredmeta[] = [];
  instrumenti: InstrumentEvaluacije[] = [];
  predmeti: Predmet[] = [];

  uspesnaPoruka: string | null = null;
  backendGreska: string | null = null;
  datumRokaGreska: string | null = null;

  constructor(
    private fb: FormBuilder,
    private evaluacijaService: EvaluacijaZnanjaService,
    private ispitniRokService: IspitniRokService,
    private realizacijaPredmetaService: RealizacijaPredmetaService,
    private instrumentEvaluacijeService: InstrumentEvaluacijeService,
    private predmetService: PredmetService
  ) {}

  ngOnInit(): void {
    this.inicijalizujForme();
    this.ucitajSvePodatke();
  }

  inicijalizujForme(): void {
    this.rokForm = this.fb.group({
      naziv: ['', Validators.required],
      datumPocetka: ['', Validators.required],
      datumZavrsetka: ['', Validators.required]
    });

    this.ispitForm = this.fb.group({
      vremePocetka: ['', Validators.required],
      vremeZavrsetka: ['', Validators.required],
      maksimalniBodovi: [100, [Validators.required, Validators.min(1)]],
      tipEvaluacijeId: [1, Validators.required],
      realizacijaPredmetaId: ['', Validators.required],
      instrumentEvaluacijeId: ['', Validators.required],
      ispitniRokId: ['', Validators.required]
    });
  }

  ucitajSvePodatke(): void {
    this.ispitniRokService.getAllWithoutPagination().subscribe(data => this.ispitniRokovi = data);
    this.realizacijaPredmetaService.getAllWithoutPagination().subscribe(data => this.realizacije = data);
    this.instrumentEvaluacijeService.getAllWithoutPagination().subscribe(data => this.instrumenti = data);
    this.predmetService.getAllWithoutPagination().subscribe(data => this.predmeti = data);
  }

  getNazivPredmeta(predmetId: number): string {
    const predmet = this.predmeti.find(p => p.id === predmetId);
    return predmet ? predmet.naziv : 'Nepoznat predmet';
  }

  dodajIspitniRok(): void {
    this.datumRokaGreska = null;
    this.uspesnaPoruka = null;

    if (this.rokForm.valid) {
      const pocetak = new Date(this.rokForm.value.datumPocetka);
      const kraj = new Date(this.rokForm.value.datumZavrsetka);

      if (pocetak >= kraj) {
        this.datumRokaGreska = "Greška: Datum početka mora biti pre datuma završetka!";
        return;
      }

      this.ispitniRokService.create(this.rokForm.value).subscribe({
        next: (response) => {
          this.uspesnaPoruka = "Ispitni rok uspešno kreiran!";
          this.rokForm.reset();
          console.log('Kreirano:', response);
          this.ispitniRokovi.push(response);

          setTimeout(() => {
            this.uspesnaPoruka = null;
          }, 1000);
        },
        error: (err) => {
          this.datumRokaGreska = "Došlo je do greške prilikom čuvanja na serveru.";
          console.error(err);
        }
      });
    }
  }

  zakaziIspit(): void {
    this.backendGreska = null;
    this.uspesnaPoruka = null;

    if (this.ispitForm.valid) {
      this.evaluacijaService.zakaziIspit(this.ispitForm.value).subscribe({
        next: (res: EvaluacijaZnanja) => {
          console.log('Sacuvan ispit:', res);
          this.uspesnaPoruka = "Ispit je uspešno zakazan u sistemu!";

          this.ispitForm.reset({
            maksimalniBodovi: 100,
            tipEvaluacijeId: 1,
            vremePocetka: '',
            vremeZavrsetka: '',
            realizacijaPredmetaId: '',
            instrumentEvaluacijeId: '',
            ispitniRokId: ''
          });

          setTimeout(() => {
            this.uspesnaPoruka = null;
          }, 1000);
        },
        error: (err: HttpErrorResponse) => {
          this.backendGreska = err.error?.message || "Došlo je do greške na serveru.";
        }
      });
    } else {
      this.ispitForm.markAllAsTouched();
    }
  }
}
