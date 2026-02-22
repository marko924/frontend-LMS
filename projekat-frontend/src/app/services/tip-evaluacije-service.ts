import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { TipEvaluacije } from '../models/tip-evaluacije';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TipEvaluacijeService extends GenericCrudService<TipEvaluacije, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/tipoviEvaluacije`); 
  }
}
