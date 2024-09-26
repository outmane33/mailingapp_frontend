import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IspComponent } from './isp.component';

describe('IspComponent', () => {
  let component: IspComponent;
  let fixture: ComponentFixture<IspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IspComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
