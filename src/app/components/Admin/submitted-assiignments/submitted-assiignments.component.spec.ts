import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedAssiignmentsComponent } from './submitted-assiignments.component';

describe('SubmittedAssiignmentsComponent', () => {
  let component: SubmittedAssiignmentsComponent;
  let fixture: ComponentFixture<SubmittedAssiignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmittedAssiignmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmittedAssiignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
