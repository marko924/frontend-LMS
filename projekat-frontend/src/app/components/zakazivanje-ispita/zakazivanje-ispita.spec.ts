import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakazivanjeIspita } from './zakazivanje-ispita';

describe('ZakazivanjeIspita', () => {
  let component: ZakazivanjeIspita;
  let fixture: ComponentFixture<ZakazivanjeIspita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZakazivanjeIspita]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZakazivanjeIspita);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
