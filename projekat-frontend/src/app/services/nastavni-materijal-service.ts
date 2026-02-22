import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { NastavniMaterijal } from '../models/nastavni-materijal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NastavniMaterijalService extends GenericCrudService<NastavniMaterijal, number> {

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/nastavniMaterijali`);
  }
}