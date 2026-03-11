import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Drzava } from '../models/drzava';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DrzavaService extends GenericCrudService<Drzava, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/drzave`); 
  }  
}
