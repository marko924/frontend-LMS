import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracijaComponent } from './administracija-component';

describe('AdministracijaComponent', () => {
  let component: AdministracijaComponent;
  let fixture: ComponentFixture<AdministracijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministracijaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministracijaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
