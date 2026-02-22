import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { TipZvanja } from '../models/tip-zvanja';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TipZvanjaService extends GenericCrudService<TipZvanja, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/tipoviZvanja`);
  }
}