import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Univerzitet } from '../models/univerzitet';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UniverzitetDetalji } from '../models/univerzitet-detalji';

@Injectable({
  providedIn: 'root',
})
export class UniverzitetService extends GenericCrudService<Univerzitet, number> {

  private readonly apiUrl = `http://localhost:8080/api/univerziteti`;

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/univerziteti`);
  }

  getDetalji(id: number): Observable<UniverzitetDetalji> {
    return this.http.get<UniverzitetDetalji>(`${this.apiUrl}/${id}/detalji`);
  }
}