import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { TipNastave } from '../models/tip-nastave';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TipNastaveService extends GenericCrudService<TipNastave, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/tipoviNastave`);
  }
}