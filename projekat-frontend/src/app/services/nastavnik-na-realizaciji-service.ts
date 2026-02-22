import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { NastavnikNaRealizaciji } from '../models/nastavnik-na-realizaciji';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NastavnikNaRealizacijiService extends GenericCrudService<NastavnikNaRealizaciji, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/nastavnici-na-realizaciji`);
  }
}