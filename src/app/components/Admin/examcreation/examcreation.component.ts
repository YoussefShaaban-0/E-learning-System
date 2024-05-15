import { Component } from '@angular/core';
import { MenuComponent } from "../admin-menu/menu.component";
import { CoursesService } from '../../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../../../interfaces/course';
import { FormArray } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Assignment } from '../../../interfaces/assignment';
import { AssignmentsService } from '../../../services/assignments.service';

@Component({
  selector: 'app-examcreation',
  standalone: true,
  templateUrl: './examcreation.component.html',
  styleUrl: './examcreation.component.css',
  imports: [CommonModule, FormsModule, RouterModule,
    ReactiveFormsModule, MenuComponent]
})
export class ExamcreationComponent {
  // for assignments
  title: string = '';
  deadline: string = '';
  questions: string[] = [];
  choices: string[] = [];
  correctChoices: boolean[] = [];
  score: number = 0;
  points: number = 0;
  // coursename: string = '';

  cardForm: FormGroup;
  firestore: any;
  courseId: any;
  lec: string[] = ["lecture 1"]
  assignment: any;
  course: Course = {
    id: '',
    title: 'username',
    description: 'email',
    img: 'role',
    lectures: this.lec,
  };
  // lengthOfLectures = this.course.lectures.length;

  constructor(private coursesService: CoursesService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private asignmentService: AssignmentsService) {
    this.cardForm = this.fb.group({
      cards: this.fb.array([])
    }
    );
    this.addCard();
  }
  isCollapsed: boolean = true;

  toggleAllCollapse() {
    this.isCollapsed = !this.isCollapsed;
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


  async ngOnInit(): Promise<void> {

    // this.isCollapsed = new Array(this.cardControls.length).fill(true);
    this.courseId = this.route.snapshot.paramMap.get('id');
    try {
      this.course = await this.coursesService.getCourse(this.courseId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }


  addAssignment() {
    const assignment: Assignment = {
      id: '', // Generate an ID or use Firebase auto-generated ID
      courseId: this.courseId,
      title: this.title,
      deadline: this.deadline,
      question: this.questions,
      choices: this.choices,
      // correctChoice: this.correctChoices,
      score: this.score,
      // points: this.points
    };
    this.asignmentService.addAssignment(assignment);
  }

  // setCorrectChoice(choice: any) {
  //   this.choices.forEach(c => {
  //       if (c === choice) {
  //           c.correct = true;
  //       } else {
  //           c.correct = false;
  //       }
  //   });
  // }
}
