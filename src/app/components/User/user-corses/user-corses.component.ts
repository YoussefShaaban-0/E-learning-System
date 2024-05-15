import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../interfaces/course';
import { CoursesService } from '../../../services/courses.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Progress, User } from '../../../interfaces/user';
import { UserMenuComponent } from "../user-menu/user-menu.component";
import { ProgressService } from '../../../services/progress.service';

@Component({
    selector: 'app-user-corses',
    standalone: true,
    templateUrl: './user-corses.component.html',
    styleUrl: './user-corses.component.css',
    imports: [CommonModule, RouterModule, FormsModule, UserMenuComponent]
})
export class UserCorsesComponent {

  userId: any;
  user: User = {
    id: '',
    username: 'username',
    email: 'email',
    role: 'role',
    waiting: true,
    password: 'password',
    courses: [''],
    requestedCourses: [],
    // isEnrolled: false,
  };
  course: Course = {
    id: '',
    title: 'username',
    description: 'email',
    img: 'role',
    lectures: [],
  };
  progress : Progress = {
    id: '',
    courseId: 'courseId',
    userId: 'userId',
    completedMaterials: 0,
    completedLectures: [],
  }
  courses: Course[] = [];
  coursesObservable: Observable<Course[]>
  progresses: { [courseId: string]: { completedMaterials: number } } = {};
  progressPercentages: { [courseId: string]: number } = {};

  constructor(public coursesService: CoursesService, private userService: UsersService,
     private router: Router, private route: ActivatedRoute, private progressService: ProgressService){
    this.coursesObservable = this.coursesService.getCourses();
    // this.calculateProgress();
    // this.userService.getUser();
  }



  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.paramMap.get('id');
    try {
      this.user = await this.userService.getUser(this.userId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }

    try {
      const courseIds = this.user.courses;
      for (const courseId of courseIds) {
        const course = await this.coursesService.getCourse(courseId);
        const progress = await this.progressService.getProgressUICI(this.userId, courseId);
        this.courses.push(course);
        this.progresses[courseId] = progress;
        this.calculateProgress(courseId, course.lectures.length, progress.completedMaterials);
      }
    } catch (error) {
      console.error('Error loading requested courses:', error);
    }
  }

  calculateProgress(courseId: string, totalLectures: number, completedLectures: number): void {
    if (totalLectures > 0) {
      this.progressPercentages[courseId] = (completedLectures / totalLectures) * 100;
    } else {
      this.progressPercentages[courseId] = 0;
    }
  }

  getProgressPercentage(courseId: string): number {
    return this.progressPercentages[courseId] || 0;
  }
}
