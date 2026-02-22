import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Uloga } from '../models/uloga';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UlogaService extends GenericCrudService<Uloga, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/uloge`); 
  }
}
