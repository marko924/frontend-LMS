import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Univerzitet } from '../models/univerzitet';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UniverzitetService extends GenericCrudService<Univerzitet, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/univerziteti`);
  }
}