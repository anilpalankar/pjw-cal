import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCaptureDialogComponent } from './rate-capture-dialog.component';

describe('RateCaptureDialogComponent', () => {
  let component: RateCaptureDialogComponent;
  let fixture: ComponentFixture<RateCaptureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateCaptureDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateCaptureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
