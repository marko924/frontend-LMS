import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { StudijskiProgram } from '../models/studijski-program';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudijskiProgramService extends GenericCrudService<StudijskiProgram, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/studijskiProgrami`);
  }
}