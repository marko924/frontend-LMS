import { TestBed } from '@angular/core/testing';

import { Drzava } from './drzava';

describe('Drzava', () => {
  let service: Drzava;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Drzava);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
