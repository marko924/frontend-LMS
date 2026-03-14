import { TestBed } from '@angular/core/testing';

import { IshodObrazovniCiljService } from './ishod-obrazovni-cilj-service';

describe('IshodObrazovniCiljService', () => {
  let service: IshodObrazovniCiljService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IshodObrazovniCiljService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
