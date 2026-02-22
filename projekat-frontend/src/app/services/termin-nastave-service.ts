import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { TerminNastave } from '../models/termin-nastave';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TerminNastaveService extends GenericCrudService<TerminNastave, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/terminiNastave`);
  }
}