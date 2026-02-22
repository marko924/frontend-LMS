import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Fakultet } from '../models/fakultet';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FakultetService extends GenericCrudService<Fakultet, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/fakulteti`);
  }
}