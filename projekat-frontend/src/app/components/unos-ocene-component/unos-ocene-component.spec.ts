import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosOceneComponent } from './unos-ocene-component';

describe('UnosOceneComponent', () => {
  let component: UnosOceneComponent;
  let fixture: ComponentFixture<UnosOceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnosOceneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnosOceneComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
