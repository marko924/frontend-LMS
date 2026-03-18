import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ZahtevZaUpisService } from '../../services/zahtev-za-upis-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZahtevZaUpisDetalji } from '../../models/zahtev-za-upis-detalji';

@Component({
  selector: 'app-zahtevi-studenata',
  imports: [CommonModule, FormsModule],
  templateUrl: './zahtevi-studenata.html',
  styleUrl: './zahtevi-studenata.css',
})
export class ZahteviStudenata implements OnInit{
  
  zahtevi: ZahtevZaUpisDetalji[] = [];
  zahtevZaOdbijanjeId: number | null = null;
  napomenaTekst: string = '';
  zahtevZaOdobrenjeId: number | null = null;
  brojIndeksaTekst: string = '';

  //Ovde sam koristio ChangeDetectorRef umesto signala zato sto sam imao samo jedan tok podatak (ucitaj i prikazi)
  //pa mi je on bio dovoljan kako bi mi se sve prikazalo odmah pri ucitavanju komponente

  constructor(private zahtevService: ZahtevZaUpisService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ucitajZahteve();
  }

  ucitajZahteve() {
    //Pomocu metode iz servisa dobijamo sve zahteve ciji je status NA_CEKANJU zajedno sa njegovim detaljima
    this.zahtevService.getSviNaCekanjuDetalji().subscribe({
      next: (data) => {
        this.zahtevi = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Greška pri učitavanju zahteva', err)
    });
  }

  //Ova funkcija se pokrece kada korisnik klikne na dugme Odobri i prikazuje formu
  prikaziFormuZaOdobravanje(id: number) {
    this.zahtevZaOdobrenjeId = id;
    this.zahtevZaOdbijanjeId = null;
    this.brojIndeksaTekst = '';
  }

  potvrdiOdobravanje(id: number) {
    const indeksRegex = /^\d{4}\/\d{6}$/; //ovo je regex parametar za definisanje formata indeksa

    if (!this.brojIndeksaTekst) {
      alert('Morate uneti broj indeksa!');
      return;
    }

    if (!indeksRegex.test(this.brojIndeksaTekst)) { //ovde pomocu test proveravam korisnikov unos indeksa
      alert('Format indeksa mora biti: GODINA/6_CIFARA (npr. 2026/000123)');
      return;
    }

    //Kada se sve proverilo odobravam zahtev tako sto mu menjam status na ODOBRENO i pravim
    //studenta na godini
    this.zahtevService.odobri(id, { brojIndeksa: this.brojIndeksaTekst }).subscribe(() => {
      alert('Student uspešno upisan!');
      this.zahtevZaOdobrenjeId = null;
      this.ucitajZahteve();
    });
  }

  //Kada korisnik klikne na dugme Odbij prikazujemu se forma za odbijanje
  prikaziFormuZaOdbijanje(id: number) {
    this.zahtevZaOdbijanjeId = id;
    this.zahtevZaOdobrenjeId = null;
    this.napomenaTekst = '';
  }

  //Proveravam da li je korisnik uneo napomenu pre potvrde odbijanja
  potvrdiOdbijanje(id: number) {
    if (!this.napomenaTekst) {
      alert('Morate uneti napomenu!');
      return;
    }
    //Ako je sve uredu onda se menja status na ODBIJENO i dodaje se napomena
    this.zahtevService.odbij(id, this.napomenaTekst).subscribe(() => {
      this.zahtevZaOdbijanjeId = null;
      this.ucitajZahteve();
    });
  }
}
