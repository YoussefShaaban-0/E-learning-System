import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { Observable } from 'rxjs';
import { Course } from '../../../interfaces/course';
import { CoursesService } from '../../../services/courses.service';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {

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
  
  coursesObservable: Observable<Course[]>

  constructor(public coursesService: CoursesService, private userService: UsersService,
     private router: Router, private route: ActivatedRoute){
    this.coursesObservable = this.coursesService.getCourses();
    // this.userService.getUser();
  }

  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.paramMap.get('id');
    try {
      this.user = await this.userService.getUser(this.userId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

}
