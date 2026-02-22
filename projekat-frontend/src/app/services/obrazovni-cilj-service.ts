import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { ObrazovniCilj } from '../models/obrazovni-cilj';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ObrazovniCiljService extends GenericCrudService<ObrazovniCilj, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/obrazovniCiljevi`); 
  }
}
