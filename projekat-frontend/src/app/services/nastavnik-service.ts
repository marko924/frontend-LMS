import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Nastavnik } from '../models/nastavnik';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NastavnikService extends GenericCrudService<Nastavnik, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/nastavnici`);
  }
}