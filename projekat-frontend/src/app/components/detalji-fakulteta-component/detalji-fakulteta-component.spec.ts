import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiFakultetaComponent } from './detalji-fakulteta-component';

describe('DetaljiFakultetaComponent', () => {
  let component: DetaljiFakultetaComponent;
  let fixture: ComponentFixture<DetaljiFakultetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetaljiFakultetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaljiFakultetaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
