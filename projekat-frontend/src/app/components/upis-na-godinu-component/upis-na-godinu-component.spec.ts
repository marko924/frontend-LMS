import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpisNaGodinuComponent } from './upis-na-godinu-component';

describe('UpisNaGodinuComponent', () => {
  let component: UpisNaGodinuComponent;
  let fixture: ComponentFixture<UpisNaGodinuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpisNaGodinuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpisNaGodinuComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
