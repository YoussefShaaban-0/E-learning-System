import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../Admin/admin-menu/menu.component';
import { CoursesService } from '../../../services/courses.service';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../interfaces/course';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserMenuComponent } from "../user-menu/user-menu.component";
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';
import { AppBarComponent } from "../../app-bar/app-bar.component";

@Component({
    selector: 'app-courses',
    standalone: true,
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.css',
    imports: [CommonModule, RouterModule, FormsModule, UserMenuComponent, AppBarComponent]
})
export class CoursesComponent {

  coursesObservable: Observable<Course[]>
  userId: any;
  user: User = {
    id: '',
    username: 'username',
    email: 'email',
    role: 'role',
    waiting: true,
    password: 'password',
    courses: [''],
    requestedCourses: [''],
    // isEnrolled: false,
  };
  enrollmentStatus: { [courseId: string]: boolean } = {};
  // course: Course[] = [{
  //   id: '',
  //   title: 'username',
  //   description: 'email',
  //   img: 'role',
  //   lectures: [],
  // }];

  constructor(public coursesService: CoursesService, private userService: UsersService, private route: ActivatedRoute) {
    this.coursesObservable = this.coursesService.getCourses();
  }

  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('id');
  }
  addRequestedCourse(courseId: any): void {
    this.enrollmentStatus[courseId] = true;
    this.userService.addRequestedCourse(this.userId, courseId);

  }
  isEnrollmentInProgress(courseId: string): boolean {
    return this.enrollmentStatus[courseId] || false; // Default to false if status is undefined
  }
}
