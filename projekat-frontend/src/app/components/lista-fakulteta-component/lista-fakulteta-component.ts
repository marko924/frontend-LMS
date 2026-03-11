import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Fakultet } from '../../models/fakultet';
import { FakultetService } from '../../services/fakultet-service';

@Component({
  selector: 'app-lista-fakulteta-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-fakulteta-component.html',
  styleUrl: './lista-fakulteta-component.css',
})
export class ListaFakultetaComponent implements OnInit {
  fakulteti: Fakultet[] = [];

  constructor(
    private fakultetService: FakultetService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ucitajSveFakultete();
  }

  ucitajSveFakultete(): void {
    this.fakultetService.getAllWithoutPagination().subscribe({
      next: (data) => {
        this.fakulteti = data;
        this.cdr.detectChanges();
        console.log('Fakulteti učitani:', data);
      },
      error: (err) => {
        console.error('Greška pri dobavljanju liste fakulteta:', err);
      }
    });
  }
}
