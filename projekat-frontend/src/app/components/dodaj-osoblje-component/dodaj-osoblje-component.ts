import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-dodaj-osoblje-component',
  imports: [CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './dodaj-osoblje-component.html',
  styleUrl: './dodaj-osoblje-component.css',
})
export class DodajOsobljeComponent implements OnInit {
  
  staffForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      korisnickoIme: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lozinka: ['', [Validators.required, Validators.minLength(6)]],
      uloga: ['ROLE_NASTAVNIK', Validators.required],
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      biografija: [''] // Samo za nastavnike
    });
  }

  onSubmit() {
    if (this.staffForm.invalid) return;

    const values = this.staffForm.value;
    
    this.authService.register(values).subscribe({
        next: () => {
          alert('Uspešno ste registrovali osoblje!');

          this.staffForm.reset({
            uloga: 'ROLE_NASTAVNIK',
            korisnickoIme: '',
            email: '',
            lozinka: '',
            ime: '',
            prezime: '',
            biografija: ''
          });

          //Resetovanje validacije - da polja ne bi bila crvena
          Object.keys(this.staffForm.controls).forEach(key => {
            const control = this.staffForm.get(key);
            control?.setErrors(null);
            control?.markAsPristine();
            control?.markAsUntouched();
          });
        },
        error: (err) => alert('Greška pri registraciji osoblja: ' + err.error)
      });
  }
}
