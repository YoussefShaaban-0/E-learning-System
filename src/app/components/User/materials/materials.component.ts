import { Component } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../../../interfaces/course';
import { FormArray} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.css'
})
export class MaterialsComponent {

  courseId: any;
  lec: string[] = ["lecture 1"]
  course: Course = {
    id: '',
    title: 'username',
    description: 'email',
    img: 'role',
    lectures: this.lec,
  };
  cardForm: FormGroup;
  lengthOfLectures = this.course.lectures.length;

  constructor(private coursesService: CoursesService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder){
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

  get numberOfLectures(): number {
    return this.course.lectures.length;
  }

  async ngOnInit(): Promise<void> {
    this.courseId = this.route.snapshot.paramMap.get('id');
    try {
      this.course = await this.coursesService.getCourse(this.courseId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

}
