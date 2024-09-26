import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBoitesComponent } from './all-boites.component';

describe('AllBoitesComponent', () => {
  let component: AllBoitesComponent;
  let fixture: ComponentFixture<AllBoitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBoitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllBoitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
