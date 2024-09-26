import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuReportComponent } from './revenu-report.component';

describe('RevenuReportComponent', () => {
  let component: RevenuReportComponent;
  let fixture: ComponentFixture<RevenuReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevenuReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevenuReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
