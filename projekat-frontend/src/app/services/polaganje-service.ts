import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Polaganje } from '../models/polaganje';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PolaganjeService extends GenericCrudService<Polaganje, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/polaganja`); 
  }
}
