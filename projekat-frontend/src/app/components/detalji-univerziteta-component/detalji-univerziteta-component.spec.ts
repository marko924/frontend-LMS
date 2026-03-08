import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiUniverzitetaComponent } from './detalji-univerziteta-component';

describe('DetaljiUniverzitetaComponent', () => {
  let component: DetaljiUniverzitetaComponent;
  let fixture: ComponentFixture<DetaljiUniverzitetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetaljiUniverzitetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaljiUniverzitetaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
