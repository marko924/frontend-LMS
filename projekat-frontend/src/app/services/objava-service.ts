import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Objava } from '../models/objava';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ObjavaService extends GenericCrudService<Objava, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/objave`); 
  }
}
