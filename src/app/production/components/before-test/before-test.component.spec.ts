import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeTestComponent } from './before-test.component';

describe('BeforeTestComponent', () => {
  let component: BeforeTestComponent;
  let fixture: ComponentFixture<BeforeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeforeTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeforeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
