import { Injectable } from '@angular/core';
import { KorisnikUloga } from '../models/korisnik-uloga';
import { GenericCrudService } from './generic-crud-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class KorisnikUlogaService extends GenericCrudService<KorisnikUloga, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/korisniciUloge`); 
  }
}
