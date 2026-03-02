import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { RegisterRequest } from '../../models/register-request';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register-component',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      korisnickoIme: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lozinka: ['', [Validators.required, Validators.minLength(6)]],
      uloga: ['ROLE_SLUZBA'], // Podrazumevana uloga
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]*$/)]]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
   
      const registerData: RegisterRequest = {
        korisnickoIme: formValues.korisnickoIme,
        lozinka: formValues.lozinka,       
        email: formValues.email,
        uloga: formValues.uloga,
        ime: formValues.ime,
        prezime: formValues.prezime,
        jmbg: formValues.jmbg
      };

      this.authService.register(registerData).subscribe({
        next: () => {
          alert('Registracija uspešna! Možete se ulogovati.');
          this.router.navigate(['/login']);
        },
        error: (err) => alert('Greška pri registraciji: ' + err.error)
      });
    }
  }
}
