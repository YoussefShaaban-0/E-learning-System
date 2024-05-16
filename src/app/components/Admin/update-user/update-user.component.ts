import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, RouterModule, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { User } from '../../../interfaces/user';
import { MenuComponent } from "../admin-menu/menu.component";
import { CoursesService } from '../../../services/courses.service';
import { Course } from '../../../interfaces/course';

@Component({
    selector: 'app-update-user',
    standalone: true,
    templateUrl: './update-user.component.html',
    styleUrl: './update-user.component.css',
    imports: [CommonModule, FormsModule, RouterModule, MenuComponent]
})
export class UpdateUserComponent {

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
  courses: Course[] = [];
  acceptStatus: { [courseId: string]: boolean } = {};

  constructor(private userservice: UsersService, private route: ActivatedRoute, private router: Router, 
    private coursesService: CoursesService){
  }

  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.paramMap.get('id');
    try {
      this.user = await this.userservice.getUser(this.userId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
    try {
      const courseIds = this.user.requestedCourses;
      for (const courseId of courseIds) {
        const course = await this.coursesService.getCourse(courseId);
        this.courses.push(course);
      }
    } catch (error) {
      console.error('Error loading requested courses:', error);
    }
  }

  updateuser()
  {
    this.userservice.updateUser(this.userId, this.user);
    this.router.navigate(['/approvals'])
  }

  addCourse(courseId: any): void {
    this.acceptStatus[courseId] = true;
    this.userservice.addMyCourse(this.userId, courseId);
    this.userservice.deleteCourse(this.userId, courseId)
}
  isAcceptedInProgress(courseId: string): boolean {
    return this.acceptStatus[courseId] || false; // Default to false if status is undefined
  }

}
