import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijaviIspitComponent } from './prijavi-ispit-component';

describe('PrijaviIspitComponent', () => {
  let component: PrijaviIspitComponent;
  let fixture: ComponentFixture<PrijaviIspitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrijaviIspitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrijaviIspitComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
