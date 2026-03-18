import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudijskiProgramDetalji } from '../../models/studijski-program-detalji';
import { GodinaStudijaDetalji } from '../../models/godina-studija-detalji';
import { StudijskiProgramService } from '../../services/studijski-program-service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalji-studijskog-programa-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './detalji-studijskog-programa-component.html',
  styleUrl: './detalji-studijskog-programa-component.css',
})
export class DetaljiStudijskogProgramaComponent implements OnInit {
  
  detalji?: StudijskiProgramDetalji;
  
  aktivnaGodina?: GodinaStudijaDetalji;
  otvorenPredmetId: number | null = null;

  //Ovde sam koristio ChangeDetectorRef umesto signala zato sto sam imao samo jedan tok podatak (ucitaj i prikazi)
  //pa mi je on bio dovoljan kako bi mi se sve prikazalo odmah pri ucitavanju komponente

  constructor(
    private programService: StudijskiProgramService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; //znak plus sluzi da brzo pretvori id iz url-a u broj
      if (id) {
        this.programService.getDetalji(id).subscribe(data => {
          this.detalji = data;
          console.log('Podaci unutar subscribe-a:', this.detalji);
          //Provervamo da li u podacima postoji bar jedan podatak o godini studija
          if (this.detalji.godineStudija && this.detalji.godineStudija.length > 0) {
            //Ako postoji sortiramo ga od godine 1 pa nadalje
            this.detalji.godineStudija.sort((a, b) => a.godina - b.godina);
            this.aktivnaGodina = this.detalji.godineStudija[0]; //Prva godina ce biti automatski izabrana
          }

          this.cdr.detectChanges();
        });
      }
    });
  }

  //Kada korisnik klikne na drugu godinu to se ovde menja
  promeniGodinu(godina: GodinaStudijaDetalji): void {
    this.aktivnaGodina = godina;
    this.otvorenPredmetId = null;
  }

  //Ova funkcija sluzi za prebacivanje prikaza jednog predmeta u drugi
  togglePredmet(predmetId: number): void {
    if (this.otvorenPredmetId === predmetId) {
      this.otvorenPredmetId = null;
    } else {
      this.otvorenPredmetId = predmetId;
    }
  }

  //Pretvaranje obicnog broja u rimski
  uRimski(broj: number): string {
    const rimski = ['I', 'II', 'III', 'IV', 'V', 'VI'];
    //ovde sam oduzimao jedan od broja kako bi ga pretvorio u pravi iz liste
    //dodao sam uslov ako se prikaze neki broj koji ne postoji u listi da ga pretvori u string
    return rimski[broj - 1] || broj.toString(); 
  }
}
