import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student-service';
import { NastavnikService } from '../../services/nastavnik-service';
import { OsobljeStudentskeSluzbeService } from '../../services/osoblje-studentske-sluzbe-service';
import { AdministratorService } from '../../services/administrator-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdresaService } from '../../services/adresa-service';
import { MestoService } from '../../services/mesto-service';
import { Adresa } from '../../models/adresa';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-profil-component',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule,
    MatSelectModule
  ],
  templateUrl: './profil-component.html',
  styleUrl: './profil-component.css',
})
export class ProfilComponent implements OnInit {
  profileForm!: FormGroup;
  userRole: string = '';
  userId: number = 0;
  trenutnaLozinka: string = '';
  adrese: Adresa[] = [];
  originalniPodaci: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private studentService: StudentService,
    private nastavnikService: NastavnikService,
    private sluzbaService: OsobljeStudentskeSluzbeService,
    private adminService: AdministratorService,
    private adresaService: AdresaService
  ) {}

  ngOnInit(): void {

    this.inicijalizujOsnovnuFormu();

    this.route.queryParams.subscribe(params => {
      this.userId = Number(params['id']);
      this.userRole = params['uloga'];

      if (this.userId && this.userRole) {
        this.nadogradiFormuNaOsnovuUloge(this.userRole);
        this.ucitajPodatke();
      }
      if (this.userRole === 'ROLE_STUDENT' || this.userRole === 'ROLE_NASTAVNIK') {
        this.ucitajAdrese();
      }
    });
  }

  ucitajAdrese() {
    this.adresaService.getAllWithoutPagination().subscribe({
      next: (podaci) => {
        this.adrese = podaci;
      },
      error: () => {
        this.snackBar.open('Greška pri učitavanju adresa.', 'Zatvori', { duration: 3000 });
      }
    });
  }

  private getActiveService(): any {
    switch (this.userRole) {
      case 'ROLE_STUDENT': return this.studentService;
      case 'ROLE_NASTAVNIK': return this.nastavnikService;
      case 'ROLE_SLUZBA': return this.sluzbaService;
      case 'ROLE_ADMIN': return this.adminService;
      default: return null;
    }
  }

  ucitajPodatke() {
    const service = this.getActiveService();
    if (service) {
      service.getOne(this.userId).subscribe({
        next: (podaci: any) => {
          this.trenutnaLozinka = podaci.lozinka;
          this.originalniPodaci = { ...podaci };
          this.profileForm.patchValue(podaci);
        },
        error: (err: any) => {
          this.snackBar.open('Greška pri učitavanju podataka.', 'Zatvori', { duration: 3000 });
        }
      });
    }
  }

  sacuvajIzmene() {
    if (this.profileForm.invalid) return;

    const noviPodaci = this.profileForm.value;

    const istaUnikatnaPolja = 
      noviPodaci.korisnickoIme === this.originalniPodaci.korisnickoIme &&
      noviPodaci.email === this.originalniPodaci.email;

    const nikakvaPromena = istaUnikatnaPolja && 
      noviPodaci.adresaId === this.originalniPodaci.adresaId &&
      (this.userRole !== 'ROLE_STUDENT' || noviPodaci.jmbg === this.originalniPodaci.jmbg);

    if (nikakvaPromena) {
      this.snackBar.open('Korisnik sa ovim podacima već postoji u sistemu.', 'Zatvori', { duration: 3000 });
      return;
    }

    const service = this.getActiveService();
    const objekatZaSlanje = { 
      ...noviPodaci, 
      id: this.userId, 
      lozinka: this.trenutnaLozinka 
    };

    service.update(this.userId, objekatZaSlanje).subscribe({
      next: () => {
        this.snackBar.open('Uspešno ste izmenili profil!', 'OK', { duration: 3000 });
        this.originalniPodaci = { ...objekatZaSlanje };
        this.profileForm.markAsPristine();
      },
      error: () => {
        this.snackBar.open('Greška: Korisnik sa ovim korisničkim imenom ili emailom već postoji.', 'Zatvori', { duration: 3000 });
      }
    });
  }

  private inicijalizujOsnovnuFormu() {
    this.profileForm = this.fb.group({
      korisnickoIme: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  nadogradiFormuNaOsnovuUloge(uloga: string) {
    if (uloga !== 'ROLE_ADMIN') {
      this.profileForm.addControl('ime', this.fb.control('', Validators.required));
      this.profileForm.addControl('prezime', this.fb.control('', Validators.required));
    }

    if (uloga === 'ROLE_STUDENT') {
      this.profileForm.addControl('jmbg', this.fb.control('', Validators.required));
    }

    if (uloga === 'ROLE_NASTAVNIK') {
      this.profileForm.addControl('biografija', this.fb.control(''));
    }

    if (uloga === 'ROLE_STUDENT' || uloga === 'ROLE_NASTAVNIK') {
      this.profileForm.addControl('adresaId', this.fb.control('', Validators.required));
    }
  }
  
}
