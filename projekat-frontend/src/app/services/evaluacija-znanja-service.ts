import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { EvaluacijaZnanja } from '../models/evaluacija-znanja';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvaluacijaZnanjaService extends GenericCrudService<EvaluacijaZnanja, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/evaluacijeZnanja`); 
  }

  zakaziIspit(evaluacija: EvaluacijaZnanja): Observable<EvaluacijaZnanja> {
    return this.http.post<EvaluacijaZnanja>(`${this.baseUrl}/zakazi-ispit`, evaluacija);
  }
}
