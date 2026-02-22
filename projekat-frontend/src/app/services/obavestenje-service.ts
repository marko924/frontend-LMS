import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Obavestenje } from '../models/obavestenje';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ObavestenjeService extends GenericCrudService<Obavestenje, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/obavestenja`); 
  }
}
