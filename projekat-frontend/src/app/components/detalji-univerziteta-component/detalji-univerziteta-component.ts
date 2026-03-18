import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UniverzitetDetalji } from '../../models/univerzitet-detalji';
import { UniverzitetService } from '../../services/univerzitet-service';

@Component({
  selector: 'app-detalji-univerziteta-component',
  imports: [CommonModule],
  templateUrl: './detalji-univerziteta-component.html',
  styleUrl: './detalji-univerziteta-component.css',
})
export class DetaljiUniverzitetaComponent implements OnInit{
  
  detalji?: UniverzitetDetalji;

  //Ovde sam koristio ChangeDetectorRef umesto signala zato sto sam imao samo jedan tok podatak (ucitaj i prikazi)
  //pa mi je on bio dovoljan kako bi mi se sve prikazalo odmah pri ucitavanju komponente

  constructor(
    private univerzitetService: UniverzitetService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //Zato sto u sistemu imam samo jedan univerzitet ja sam onda dobavio detalje samo za njega
    this.univerzitetService.getDetalji(1).subscribe({
      next: (data) => {
        this.detalji = data;
        this.cdr.detectChanges();
        console.log('Podaci stigli u komponentu:', data);
      },
      error: (err) => console.error('Greška:', err)
    });
  }
}
