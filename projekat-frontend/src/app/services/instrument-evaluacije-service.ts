import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { InstrumentEvaluacije } from '../models/instrument-evaluacije';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InstrumentEvaluacijeService extends GenericCrudService<InstrumentEvaluacije, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/instrumentiEvaluacije`); 
  }
}
