import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFakultetaComponent } from './lista-fakulteta-component';

describe('ListaFakultetaComponent', () => {
  let component: ListaFakultetaComponent;
  let fixture: ComponentFixture<ListaFakultetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFakultetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFakultetaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
