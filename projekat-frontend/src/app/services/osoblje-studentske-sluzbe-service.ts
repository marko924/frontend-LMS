import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { OsobljeStudentskeSluzbe } from '../models/osoblje-studentske-sluzbe';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OsobljeStudentskeSluzbeService extends GenericCrudService<OsobljeStudentskeSluzbe, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/osobljeStudentskeSluzbe`); 
  }
}
