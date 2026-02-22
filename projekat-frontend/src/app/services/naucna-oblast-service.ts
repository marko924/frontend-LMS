import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { NaucnaOblast } from '../models/naucna-oblast';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NaucnaOblastService extends GenericCrudService<NaucnaOblast, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/naucneOblasti`);
  }
}