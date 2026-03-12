import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudijskiProgram } from '../../models/studijski-program';
import { StudijskiProgramService } from '../../services/studijski-program-service';

@Component({
  selector: 'app-lista-studijskih-programa-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-studijskih-programa-component.html',
  styleUrl: './lista-studijskih-programa-component.css',
})
export class ListaStudijskihProgramaComponent implements OnInit {
  programi: StudijskiProgram[] = [];

  constructor(
    private programService: StudijskiProgramService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ucitajSvePrograme();
  }

  ucitajSvePrograme(): void {
    this.programService.getAllWithoutPagination().subscribe({
      next: (data) => {
        this.programi = data;
        this.cdr.detectChanges();
        console.log('Studijski programi učitani:', data);
      },
      error: (err) => {
        console.error('Greška pri dobavljanju liste studijskih programa:', err);
      }
    });
  }
}
