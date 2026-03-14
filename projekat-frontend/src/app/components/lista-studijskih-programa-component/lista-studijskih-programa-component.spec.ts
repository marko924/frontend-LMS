import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaStudijskihProgramaComponent } from './lista-studijskih-programa-component';

describe('ListaStudijskihProgramaComponent', () => {
  let component: ListaStudijskihProgramaComponent;
  let fixture: ComponentFixture<ListaStudijskihProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaStudijskihProgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaStudijskihProgramaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
