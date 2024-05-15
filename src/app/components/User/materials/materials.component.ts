import { Component } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../../../interfaces/course';
import { FormArray} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssignmentsService } from '../../../services/assignments.service';
import { Observable } from 'rxjs';
import { Assignment } from '../../../interfaces/assignment';
import { UserMenuComponent } from "../user-menu/user-menu.component";
import { Progress, User } from '../../../interfaces/user';
import { UsersService } from '../../../services/users.service';
import { ProgressService } from '../../../services/progress.service';
import { AppBarComponent } from "../../app-bar/app-bar.component";

@Component({
    selector: 'app-materials',
    standalone: true,
    templateUrl: './materials.component.html',
    styleUrl: './materials.component.css',
    imports: [CommonModule, RouterModule, FormsModule, UserMenuComponent, AppBarComponent]
})
export class MaterialsComponent {

  // user: User;
  // course: Course;
  progressPercentage: number = 0;
  // completedLectures: number[] = [];

  


  userId: any;
  courseId: any;
  user: User = {
    id: '',
    username: 'username',
    email: 'email',
    role: 'role',
    waiting: true,
    password: 'password',
    courses: [''],
    requestedCourses: [],
    // courseProgress: {},
  };

   progress : Progress = {
    id: '',
    courseId: 'courseId',
    userId: 'userId',
    completedMaterials: 0,
    completedLectures: [],
  }
  
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
  assignments: Assignment[] = [];
  completedLectures: number[] = [];
  completedMaterials: number = 0;

  constructor(private coursesService: CoursesService, private route: ActivatedRoute, 
    private userService:UsersService, private router: Router, private fb: FormBuilder,
     private assignmentService: AssignmentsService, private progressService: ProgressService){
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
    this.courseId = this.route.snapshot.paramMap.get('mid');
    try {
      this.assignments = await this.assignmentService.getAssignmentsByCourseId(this.courseId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
    
    try {
      this.course = await this.coursesService.getCourse(this.courseId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
    this.userId = this.route.snapshot.paramMap.get('id');
    try {
      this.user = await this.userService.getUser(this.userId);
      this.progress = await this.progressService.getProgressUICI(this.userId, this.courseId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }


      // this.completedLectures = this.user.courseProgress[this.courseId] || [];
      // this.loadCourse(this.courseId);
    
  }


  // loadCourse(courseId: string): void {
    
  //     this.course = this.coursesService.getCourse(this.courseId);
  //     this.calculateProgress();
  
  // }
  addProgress(){
    const pro : Progress = {
      id: '',
      courseId: this.courseId,
      userId: this.userId,
      completedMaterials: this.completedMaterials,
      completedLectures: this.completedLectures,
    }
    this.progressService.addProgress(pro);
  }

  check(i: any){
    this.completedLectures.push(i);
    this.completedMaterials++;
  }


//  assignments = this.assignmentService.getAssignmentsCount();
// addsubmittedAssignment() {
//   const assignment: Progress = {
//     id: '', // Generate an ID or use Firebase auto-generated ID
//     userId: this.userId,
//     courseId: this.assignment.courseId,
//     title: this.assignment.title,
//     deadline: this.assignment.deadline,
//     question: this.assignment.question,
//     choices: this.choices,
//     // correctChoice: this.correctChoices,
//     score: this.score,
//     // points: this.points
//   };
//   this.submittedServise.addAssignment(assignment);
//   this.router.navigate(['/home', this.userId]);
// }
}
