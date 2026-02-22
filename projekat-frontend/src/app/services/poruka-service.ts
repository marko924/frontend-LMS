import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Poruka } from '../models/poruka';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PorukaService extends GenericCrudService<Poruka, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/poruke`); 
  }
}
