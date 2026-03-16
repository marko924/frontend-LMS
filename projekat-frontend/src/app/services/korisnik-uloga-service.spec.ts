import { TestBed } from '@angular/core/testing';

import { KorisnikUlogaService } from './korisnik-uloga-service';

describe('KorisnikUlogaService', () => {
  let service: KorisnikUlogaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KorisnikUlogaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
