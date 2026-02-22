import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { Forum } from '../models/forum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ForumService extends GenericCrudService<Forum, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/forumi`); 
  }
}
