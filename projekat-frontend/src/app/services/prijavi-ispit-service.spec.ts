import { TestBed } from '@angular/core/testing';

import { PrijaviIspitService } from './prijavi-ispit-service';

describe('PrijaviIspitService', () => {
  let service: PrijaviIspitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrijaviIspitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
