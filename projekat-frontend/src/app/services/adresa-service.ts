import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Adresa } from '../models/adresa';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdresaService extends GenericCrudService<Adresa, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/adrese`); 
  }
}
