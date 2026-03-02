import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojiPredmetiComponent } from './moji-predmeti-component';

describe('MojiPredmetiComponent', () => {
  let component: MojiPredmetiComponent;
  let fixture: ComponentFixture<MojiPredmetiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MojiPredmetiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MojiPredmetiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
