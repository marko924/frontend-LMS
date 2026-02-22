import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService extends GenericCrudService<Student, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/studenti`);
  }
}