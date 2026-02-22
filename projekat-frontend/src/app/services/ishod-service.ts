import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Ishod } from '../models/ishod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IshodService extends GenericCrudService<Ishod, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/ishodi`); 
  }
}
