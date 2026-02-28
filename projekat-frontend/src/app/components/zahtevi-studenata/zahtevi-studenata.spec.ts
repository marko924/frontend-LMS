import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahteviStudenata } from './zahtevi-studenata';

describe('ZahteviStudenata', () => {
  let component: ZahteviStudenata;
  let fixture: ComponentFixture<ZahteviStudenata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZahteviStudenata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZahteviStudenata);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
