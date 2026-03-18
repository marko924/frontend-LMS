import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FakultetDetalji } from '../../models/fakultet-detalji';
import { FakultetService } from '../../services/fakultet-service';

@Component({
  selector: 'app-detalji-fakulteta-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './detalji-fakulteta-component.html',
  styleUrl: './detalji-fakulteta-component.css',
})
export class DetaljiFakultetaComponent implements OnInit {
  
  detalji?: FakultetDetalji;

  constructor(
    private fakultetService: FakultetService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];  //znak plus sluzi da brzo pretvori id iz url-a u broj
      if (id) {
        this.fakultetService.getDetalji(id).subscribe({
          next: (data) => {
            this.detalji = data;
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Greška pri učitavanju detalja fakulteta', err)
        });
      }
    });
  }
}
