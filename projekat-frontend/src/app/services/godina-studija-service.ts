import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { GodinaStudija } from '../models/godina-studija';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GodinaStudijaService extends GenericCrudService<GodinaStudija, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/godine-studija`);
  }
}