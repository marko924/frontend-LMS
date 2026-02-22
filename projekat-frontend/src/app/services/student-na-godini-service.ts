import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { StudentNaGodini } from '../models/student-na-godini';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentNaGodiniService extends GenericCrudService<StudentNaGodini, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/studentiNaGodini`);
  }
}