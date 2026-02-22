import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Predmet } from '../models/predmet';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PredmetService extends GenericCrudService<Predmet, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/predmeti`);
  }
}