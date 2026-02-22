import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Zvanje } from '../models/zvanje';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ZvanjeService extends GenericCrudService<Zvanje, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/zvanja`);
  }
}