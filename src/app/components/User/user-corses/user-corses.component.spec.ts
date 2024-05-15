import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCorsesComponent } from './user-corses.component';

describe('UserCorsesComponent', () => {
  let component: UserCorsesComponent;
  let fixture: ComponentFixture<UserCorsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCorsesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCorsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
