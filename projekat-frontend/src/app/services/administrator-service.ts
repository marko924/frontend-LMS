import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Administrator } from '../models/administrator';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService extends GenericCrudService<Administrator, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/administratori`); 
  }
}
