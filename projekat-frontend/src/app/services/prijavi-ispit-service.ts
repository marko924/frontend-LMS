import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { PrijaviIspit } from '../models/prijavi-ispit';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrijaviIspitService extends GenericCrudService<PrijaviIspit, number> {
  
  private readonly apiUrl = `http://localhost:8080/api/prijave-ispita`;

  constructor(protected override http: HttpClient) {
    
    super(http, `http://localhost:8080/api/prijave-ispita`);
  }


  getDostupniZaStudenta(studentNaGodiniId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dostupni/${studentNaGodiniId}`);
  }
}