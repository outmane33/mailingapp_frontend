import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropMonitorComponent } from './drop-monitor.component';

describe('DropMonitorComponent', () => {
  let component: DropMonitorComponent;
  let fixture: ComponentFixture<DropMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropMonitorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
