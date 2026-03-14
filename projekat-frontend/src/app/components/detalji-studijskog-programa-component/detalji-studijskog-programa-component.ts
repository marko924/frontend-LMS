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

  constructor(
    private programService: StudijskiProgramService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.programService.getDetalji(id).subscribe(data => {
          this.detalji = data;
          console.log('Podaci unutar subscribe-a:', this.detalji);
          if (this.detalji.godineStudija && this.detalji.godineStudija.length > 0) {
            this.detalji.godineStudija.sort((a, b) => a.godina - b.godina);
            this.aktivnaGodina = this.detalji.godineStudija[0];
          }

          this.cdr.detectChanges();
        });
      }
    });
  }

  promeniGodinu(godina: GodinaStudijaDetalji): void {
    this.aktivnaGodina = godina;
    this.otvorenPredmetId = null;
  }

  togglePredmet(predmetId: number): void {
    if (this.otvorenPredmetId === predmetId) {
      this.otvorenPredmetId = null;
    } else {
      this.otvorenPredmetId = predmetId;
    }
  }

  uRimski(broj: number): string {
    const rimski = ['I', 'II', 'III', 'IV', 'V', 'VI'];
    return rimski[broj - 1] || broj.toString();
  }
}
