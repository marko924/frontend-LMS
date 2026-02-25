import { TestBed } from '@angular/core/testing';

import { ZahtevZaUpisService } from './zahtev-za-upis-service';

describe('ZahtevZaUpisService', () => {
  let service: ZahtevZaUpisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZahtevZaUpisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
