import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { RealizacijaPredmeta } from '../models/realizacija-predmeta';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RealizacijaPredmetaService extends GenericCrudService<RealizacijaPredmeta, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/realizacije-predmeta`);
  }
}