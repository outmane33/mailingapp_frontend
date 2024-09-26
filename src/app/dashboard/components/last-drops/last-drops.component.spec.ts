import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastDropsComponent } from './last-drops.component';

describe('LastDropsComponent', () => {
  let component: LastDropsComponent;
  let fixture: ComponentFixture<LastDropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastDropsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastDropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
