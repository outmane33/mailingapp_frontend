import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListsComponent } from './email-lists.component';

describe('EmailListsComponent', () => {
  let component: EmailListsComponent;
  let fixture: ComponentFixture<EmailListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
