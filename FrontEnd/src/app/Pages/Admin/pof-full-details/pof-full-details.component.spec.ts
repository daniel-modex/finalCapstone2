import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PofFullDetailsComponent } from './pof-full-details.component';

describe('PofFullDetailsComponent', () => {
  let component: PofFullDetailsComponent;
  let fixture: ComponentFixture<PofFullDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PofFullDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PofFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
