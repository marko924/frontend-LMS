import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Fakultet } from '../models/fakultet';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FakultetDetalji } from '../models/fakultet-detalji';

@Injectable({
  providedIn: 'root',
})
export class FakultetService extends GenericCrudService<Fakultet, number> {

  private readonly apiUrl = `http://localhost:8080/api/fakulteti`;

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/fakulteti`);
  }

  getDetalji(id: number): Observable<FakultetDetalji> {
    return this.http.get<FakultetDetalji>(`${this.apiUrl}/${id}/detalji`);
  }
}