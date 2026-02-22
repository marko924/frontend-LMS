import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Tema } from '../models/tema';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TemaService extends GenericCrudService<Tema, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/teme`); 
  }
}
