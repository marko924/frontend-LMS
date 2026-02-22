import { Injectable } from '@angular/core';
import { GenericCrudService } from './generic-crud-service';
import { RegistrovaniKorisnik } from '../models/registrovani-korisnik';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrovaniKorisnikService extends GenericCrudService<RegistrovaniKorisnik, number>{
  
  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/registrovaniKorisnici`); 
  }
}
