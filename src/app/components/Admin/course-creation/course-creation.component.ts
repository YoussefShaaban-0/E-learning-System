import { Component } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { Course } from '../../../interfaces/course';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "../admin-menu/menu.component";

@Component({
    selector: 'app-course-creation',
    standalone: true,
    templateUrl: './course-creation.component.html',
    styleUrl: './course-creation.component.css',
    imports: [CommonModule, ReactiveFormsModule, MenuComponent]
})
export class CourseCreationComponent {
  cardForm: FormGroup;

  constructor(private coursesService: CoursesService, private router: Router, private fb: FormBuilder){
    this.cardForm = this.fb.group({
      cards: this.fb.array([])}
    );
    this.addCard();
  }

  get cardControls() {
    return (this.cardForm.get('cards') as FormArray).controls;
  }

  addCard() {
    const cards = this.cardForm.get('cards') as FormArray;
    cards.push(this.fb.group({
      title: '',
      content: ''
    }));
  }
  deleteCard(index: number) {
    const cards = this.cardForm.get('cards') as FormArray;
    cards.removeAt(index);
  }

  addcourse(title: any, description: any, img: any){
    this.coursesService.addCourse(title.value, description.value, img.value)
    title.value = ''; 
    description.value = '';
    img.value = '';
    this.router.navigate(['/admin-courses'])
  }

}
