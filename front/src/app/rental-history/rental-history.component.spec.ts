import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalHistoryComponent } from './rental-history.component';

describe('RentalHistoryComponent', () => {
  let component: RentalHistoryComponent;
  let fixture: ComponentFixture<RentalHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalHistoryComponent]
    });
    fixture = TestBed.createComponent(RentalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
