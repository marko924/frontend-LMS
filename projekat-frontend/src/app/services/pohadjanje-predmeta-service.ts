import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { PohadjanjePredmeta } from '../models/pohadjanje-predmeta';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PohadjanjePredmetaService extends GenericCrudService<PohadjanjePredmeta, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/pohadjanjaPredmeta`);
  }
}