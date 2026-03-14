import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiStudijskogProgramaComponent } from './detalji-studijskog-programa-component';

describe('DetaljiStudijskogProgramaComponent', () => {
  let component: DetaljiStudijskogProgramaComponent;
  let fixture: ComponentFixture<DetaljiStudijskogProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetaljiStudijskogProgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaljiStudijskogProgramaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
