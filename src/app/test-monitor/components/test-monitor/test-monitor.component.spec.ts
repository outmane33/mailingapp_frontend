import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMonitorComponent } from './test-monitor.component';

describe('TestMonitorComponent', () => {
  let component: TestMonitorComponent;
  let fixture: ComponentFixture<TestMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestMonitorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
