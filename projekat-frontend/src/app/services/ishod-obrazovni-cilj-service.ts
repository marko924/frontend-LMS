import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { IshodObrazovniCilj } from '../models/ishod-obrazovni-cilj';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IshodObrazovniCiljService extends GenericCrudService<IshodObrazovniCilj, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/ishodiObrazovniCiljevi`); 
  }
}
