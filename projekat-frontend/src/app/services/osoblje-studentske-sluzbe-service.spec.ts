import { TestBed } from '@angular/core/testing';

import { OsobljeStudentskeSluzbeService } from './osoblje-studentske-sluzbe-service';

describe('OsobljeStudentskeSluzbeService', () => {
  let service: OsobljeStudentskeSluzbeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsobljeStudentskeSluzbeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
