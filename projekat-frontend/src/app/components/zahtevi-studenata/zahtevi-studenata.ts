import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ZahtevZaUpis } from '../../models/zahtev-za-upis';
import { ZahtevZaUpisService } from '../../services/zahtev-za-upis-service';
import { StatusZahteva } from '../../models/status-zahteva.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-zahtevi-studenata',
  imports: [CommonModule, FormsModule],
  templateUrl: './zahtevi-studenata.html',
  styleUrl: './zahtevi-studenata.css',
})
export class ZahteviStudenata implements OnInit{
  
  zahtevi: ZahtevZaUpis[] = [];
  zahtevZaOdbijanjeId: number | null = null;
  napomenaTekst: string = '';
  zahtevZaOdobrenjeId: number | null = null;
  brojIndeksaTekst: string = '';

  constructor(private zahtevService: ZahtevZaUpisService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ucitajZahteve();
  }

  ucitajZahteve() {
    // Uzimamo sve neobrađene zahteve (status NA_CEKANJU)
    this.zahtevService.getAllWithoutPagination().subscribe(page => {
      this.zahtevi = page.filter(z => z.status === StatusZahteva.NA_CEKANJU);
      console.log(this.zahtevi);
      this.cdr.detectChanges();
    });
  }

  prikaziFormuZaOdobravanje(id: number) {
    this.zahtevZaOdobrenjeId = id;
    this.zahtevZaOdbijanjeId = null;
    this.brojIndeksaTekst = '';
  }

  potvrdiOdobravanje(id: number) {
    const indeksRegex = /^\d{4}\/\d{6}$/;

    if (!this.brojIndeksaTekst) {
      alert('Morate uneti broj indeksa!');
      return;
    }

    if (!indeksRegex.test(this.brojIndeksaTekst)) {
      alert('Format indeksa mora biti: GODINA/6_CIFARA (npr. 2026/000123)');
      return;
    }

    this.zahtevService.odobri(id, { brojIndeksa: this.brojIndeksaTekst }).subscribe(() => {
      alert('Student uspešno upisan!');
      this.zahtevZaOdobrenjeId = null;
      this.ucitajZahteve();
    });
  }

  prikaziFormuZaOdbijanje(id: number) {
    this.zahtevZaOdbijanjeId = id;
    this.napomenaTekst = '';
  }

  potvrdiOdbijanje(id: number) {
    if (!this.napomenaTekst) {
      alert('Morate uneti napomenu!');
      return;
    }
    
    this.zahtevService.odbij(id, this.napomenaTekst).subscribe(() => {
      this.zahtevZaOdbijanjeId = null;
      this.ucitajZahteve();
    });
  }
}
