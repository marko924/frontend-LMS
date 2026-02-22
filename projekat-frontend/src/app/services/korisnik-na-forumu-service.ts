import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { KorisnikNaForumu } from '../models/korisnik-na-forumu';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class KorisnikNaForumuService extends GenericCrudService<KorisnikNaForumu, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/korisnikNaForumima`); 
  }  
}
