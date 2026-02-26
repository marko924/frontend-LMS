import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fakultet } from '../../models/fakultet';
import { StudijskiProgram } from '../../models/studijski-program';
import { FakultetService } from '../../services/fakultet-service';
import { StudijskiProgramService } from '../../services/studijski-program-service';
import { StudentNaGodiniService } from '../../services/student-na-godini-service';
import { StudentNaGodini } from '../../models/student-na-godini';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upis-na-godinu-component',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './upis-na-godinu-component.html',
  styleUrl: './upis-na-godinu-component.css',
})
export class UpisNaGodinuComponent {

  forma!: FormGroup;

  fakulteti: Fakultet[] = [];
  sviProgrami: StudijskiProgram[] = [];
  filtriraniProgrami: StudijskiProgram[] = [];
  godineStudija = [1, 2, 3, 4];

  constructor(
    private fb: FormBuilder,
    private fakultetService: FakultetService,
    private studijskiProgramService: StudijskiProgramService,
    private studentNaGodiniService: StudentNaGodiniService
  ) {}

  ngOnInit(): void {

    this.forma = this.fb.group({
      fakultetId: ['', Validators.required],
      studijskiProgramId: ['', Validators.required],
      godinaStudija: ['', Validators.required]
    });

    this.ucitajFakultete();
    this.ucitajStudijskePrograme();
  }

  ucitajFakultete() {
  this.fakultetService.getAllWithoutPagination().subscribe({
    next: (res) => this.fakulteti = res,
    error: (err) => console.error('Greška pri učitavanju fakulteta', err)
  });
}

ucitajStudijskePrograme() {
  this.studijskiProgramService.getAllWithoutPagination().subscribe({
    next: (res) => this.sviProgrami = res,
    error: (err) => console.error('Greška pri učitavanju studijskih programa', err)
  });
}

onFakultetChange() {
  const fakultetId = this.forma.value.fakultetId;
  this.filtriraniProgrami = this.sviProgrami.filter(p => p.fakultetId === +fakultetId);
  this.forma.patchValue({ studijskiProgramId: '' }); // resetuj program
}

sacuvaj() {
  if (this.forma.valid) {
    const objekat: StudentNaGodini = {
      ...this.forma.value,
      pohadjanjaId: []
    };

    this.studentNaGodiniService.create(objekat).subscribe({
      next: () => {
        alert('Student uspešno upisan na godinu!');
        this.forma.reset();
        this.filtriraniProgrami = [];
      },
      error: (err) => console.error('Greška pri upisu studenta na godinu', err)
    });
  }
}
  }




