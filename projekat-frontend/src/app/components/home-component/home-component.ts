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

//Lista fakulteta bi mogla biti prikazana kao neke kartice sa osnovnim informacijama i kada se klikne neka od njih da se
//korisniku prikaze kompoeneta detalji fakulteta

//Studijski programi bi mogla biti prikazana kao sto su prikazani studijski programi i na singidunum stranici, znaci kao opadajuce
//liste gde je svaka lista godina studija i kada se otvori prikazu se predmeti, a kada se neki predmet otvori prikazu se njegove
//informacije kao sto je opis, broj espb, neki materijali itd.
}
