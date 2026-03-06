import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstorijaIspitaComponent } from './istorija-ispita-component';

describe('IstorijaIspitaComponent', () => {
  let component: IstorijaIspitaComponent;
  let fixture: ComponentFixture<IstorijaIspitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IstorijaIspitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IstorijaIspitaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
