import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedAssignmentComponent } from './submitted-assignment.component';

describe('SubmittedAssignmentComponent', () => {
  let component: SubmittedAssignmentComponent;
  let fixture: ComponentFixture<SubmittedAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmittedAssignmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmittedAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
