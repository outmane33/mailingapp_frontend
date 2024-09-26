import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRevenuReportComponent } from './total-revenu-report.component';

describe('TotalRevenuReportComponent', () => {
  let component: TotalRevenuReportComponent;
  let fixture: ComponentFixture<TotalRevenuReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalRevenuReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalRevenuReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
