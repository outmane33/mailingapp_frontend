import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientesComponent } from './recipientes.component';

describe('RecipientesComponent', () => {
  let component: RecipientesComponent;
  let fixture: ComponentFixture<RecipientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
