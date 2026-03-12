import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { StudijskiProgram } from '../models/studijski-program';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudijskiProgramDetalji } from '../models/studijski-program-detalji';

@Injectable({
  providedIn: 'root',
})
export class StudijskiProgramService extends GenericCrudService<StudijskiProgram, number> {

  private readonly apiUrl = 'http://localhost:8080/api/studijskiProgrami';

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/studijskiProgrami`);
  }

  getDetalji(id: number): Observable<StudijskiProgramDetalji> {
    return this.http.get<StudijskiProgramDetalji>(`${this.apiUrl}/${id}/detalji`);
  }
}