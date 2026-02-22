import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Fajl } from '../models/fajl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FajlService extends GenericCrudService<Fajl, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/fajlovi`); 
  }
}
