import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, RouterModule, MatToolbarModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

  //Napraviti sledece kompoenente koje ce se ucitavati u ovoj komponenti: 
  //DetaljiUniverzitetaComponent - za prikaz osnovnih informacija o fakultetu
  //ListaFakultetaComponent - za prikaz liste fakulteta sa univerziteta
  //DetaljiFakultetaComponent - za prikaz odabranog fakulteta
  //StudijskiProgramiComponent - za prikaz svih studijskih programa na univerzitetu kao i njihovih informacija

  //Detalji univerziteta bi mogli imati sledeci kod:
//   export class UniversityDetailsComponent implements OnInit {
//   // Promenljiva koja čuva podatke o univerzitetu
//   univerzitet: Univerzitet | null = null; 

//   constructor() {
//     // Ovde bi obično išao Dependency Injection tvog servisa, npr:
//     // constructor(private univerzitetService: UniverzitetService) {}
//   }

//   ngOnInit(): void {
//     // Kada se komponenta učita, povlačimo podatke.
//     // OVO JE MOCK DATA (Lažni podaci) - ovde ćeš ubaciti poziv ka tvom backendu!
//     this.univerzitet = {
//       id: 1,
//       naziv: 'Univerzitet Singidunum',
//       opis: 'Univerzitet Singidunum je visokoškolska ustanova koja svojim studentima nudi moderne studijske programe usklađene sa potrebama tržišta rada. Posvećeni smo edukaciji stručnjaka iz različitih oblasti.',
//       lokacija: 'Danijelova 32, 11000 Beograd, Srbija',
//       telefon: '+381 11 3094 094',
//       email: 'office@singidunum.ac.rs',
//       rektor: {
//         id: 101,
//         ime: 'Petar',
//         prezime: 'Petrović',
//         zvanje: 'Redovni profesor',
//         email: 'rektor@singidunum.ac.rs'
//       }
//     };
//   }
// }
// <div class="uni-container" *ngIf="univerzitet">
  
//   <mat-card class="uni-card">
//     <mat-card-header>
//       <div mat-card-avatar>
//         <mat-icon color="primary" class="header-icon">school</mat-icon>
//       </div>
//       <mat-card-title>{{ univerzitet.naziv }}</mat-card-title>
//       <mat-card-subtitle>Osnovni podaci o instituciji</mat-card-subtitle>
//     </mat-card-header>

//     <mat-card-content>
//       <div class="section-opis">
//         <h3>O nama</h3>
//         <p>{{ univerzitet.opis }}</p>
//       </div>

//       <mat-divider></mat-divider>

//       <div class="info-grid">
//         <div class="info-item">
//           <mat-icon color="accent">location_on</mat-icon>
//           <div>
//             <strong>Lokacija:</strong><br>
//             <span>{{ univerzitet.lokacija }}</span>
//           </div>
//         </div>

//         <div class="info-item">
//           <mat-icon color="accent">phone</mat-icon>
//           <div>
//             <strong>Telefon:</strong><br>
//             <span>{{ univerzitet.telefon }}</span>
//           </div>
//         </div>

//         <div class="info-item">
//           <mat-icon color="accent">email</mat-icon>
//           <div>
//             <strong>Email:</strong><br>
//             <span>{{ univerzitet.email }}</span>
//           </div>
//         </div>
//       </div>

//       <mat-divider></mat-divider>

//       <div class="rektor-section">
//         <h3>Rektor Univerziteta</h3>
//         <div class="info-item">
//           <mat-icon color="primary">person</mat-icon>
//           <div>
//             <strong>{{ univerzitet.rektor.zvanje }} dr {{ univerzitet.rektor.ime }} {{ univerzitet.rektor.prezime }}</strong><br>
//             <span class="text-muted">{{ univerzitet.rektor.email }}</span>
//           </div>
//         </div>
//       </div>

//     </mat-card-content>
//   </mat-card>

// </div>

// <div *ngIf="!univerzitet" class="loading-state">
//   <p>Učitavanje podataka o univerzitetu...</p>
// </div>
// .uni-container {
//   padding: 2rem;
//   display: flex;
//   justify-content: center; /* Centrira karticu na ekranu */
// }

// .uni-card {
//   max-width: 800px;
//   width: 100%;
// }

// .header-icon {
//   transform: scale(1.5); /* Malo uvećava ikonicu pored naslova */
// }

// .section-opis {
//   margin: 1.5rem 0;
//   line-height: 1.6;
// }

// /* Pravimo rešetku za kontakt podatke */
// .info-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 1.5rem;
//   margin: 1.5rem 0;
// }

// .info-item {
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// }

// .rektor-section {
//   margin-top: 1.5rem;
// }

// .text-muted {
//   color: #666;
//   font-size: 0.9em;
// }

// .loading-state {
//   text-align: center;
//   padding: 3rem;
//   font-size: 1.2rem;
//   color: #555;
// }

//Lista fakulteta bi mogla biti prikazana kao neke kartice sa osnovnim informacijama i kada se klikne neka od njih da se
//korisniku prikaze kompoeneta detalji fakulteta

//Studijski programi bi mogla biti prikazana kao sto su prikazani studijski programi i na singidunum stranici, znaci kao opadajuce
//liste gde je svaka lista godina studija i kada se otvori prikazu se predmeti, a kada se neki predmet otvori prikazu se njegove
//informacije kao sto je opis, broj espb, neki materijali itd.
}
