import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamcreationComponent } from './examcreation.component';

describe('ExamcreationComponent', () => {
  let component: ExamcreationComponent;
  let fixture: ComponentFixture<ExamcreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamcreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
