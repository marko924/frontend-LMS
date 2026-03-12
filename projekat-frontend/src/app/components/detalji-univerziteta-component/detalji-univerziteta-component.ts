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

  constructor(
    private univerzitetService: UniverzitetService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.univerzitetService.getDetalji(2).subscribe({
      next: (data) => {
        this.detalji = data;
        this.cdr.detectChanges();
        console.log('Podaci stigli u komponentu:', data);
      },
      error: (err) => console.error('Greška:', err)
    });
  }
}
