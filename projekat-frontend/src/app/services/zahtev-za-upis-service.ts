import { Injectable } from '@angular/core';
import { ZahtevZaUpis } from '../models/zahtev-za-upis';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from './generic-crud-service';
import { OdobravanjeZahteva } from '../models/odobravanje-zahteva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZahtevZaUpisService extends GenericCrudService<ZahtevZaUpis, number>{
  
  private url = `http://localhost:8080/api/zahteviZaUpis`;

  constructor(protected override http: HttpClient) {
    super(http, `http://localhost:8080/api/zahteviZaUpis`);
  }

  // Dodajemo metodu koja ne zavisi od Generic tipa da bi izbegli probleme sa ID-em
  postaviZahtev(dto: any): Observable<any> {
    return this.http.post(this.url, dto);
  }

  odobri(id: number, podaci: OdobravanjeZahteva): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}/odobri`, podaci);
  }

  odbij(id: number): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}/odbij`, {});
  }
}