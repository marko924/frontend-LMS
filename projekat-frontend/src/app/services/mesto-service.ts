import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Mesto } from '../models/mesto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MestoService extends GenericCrudService<Mesto, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/mesta`); 
  }
}
