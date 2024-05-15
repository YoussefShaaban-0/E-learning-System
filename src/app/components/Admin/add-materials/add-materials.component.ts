import { Component } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../../../interfaces/course';
import { FormArray} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "../admin-menu/menu.component";
import { AppBarComponent } from "../../app-bar/app-bar.component";

@Component({
    selector: 'app-add-materials',
    standalone: true,
    templateUrl: './add-materials.component.html',
    styleUrl: './add-materials.component.css',
    imports: [CommonModule, FormsModule, RouterModule,
        ReactiveFormsModule, MenuComponent, AppBarComponent]
})
export class AddMaterialsComponent {

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
  firestore: any;

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

  updateCource()
  {
    this.coursesService.updateCourse(this.courseId, this.course);
    this.router.navigate(['/admin-courses'])
  }

  addLecture(newLecture: any) {
    this.coursesService.addLecture(this.courseId, newLecture.value);
    this.router.navigate(['/add-materials', this.courseId]);
    // window.location.reload();
  }
}
