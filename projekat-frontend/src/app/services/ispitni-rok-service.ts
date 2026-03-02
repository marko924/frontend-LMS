import { Injectable } from '@angular/core';
import { IspitniRok } from '../models/ispitni-rok';
import { GenericCrudService } from './generic-crud-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IspitniRokService extends GenericCrudService<IspitniRok, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/ispitniRokovi`); 
  }
}
