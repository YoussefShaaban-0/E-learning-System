import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../../../interfaces/course';
import { CoursesService } from '../../../services/courses.service';
import { MenuComponent } from "../admin-menu/menu.component";

@Component({
    selector: 'app-admin-courses',
    standalone: true,
    templateUrl: './admin-courses.component.html',
    styleUrl: './admin-courses.component.css',
    imports: [CommonModule, RouterModule, FormsModule, MenuComponent]
})
export class AdminCoursesComponent {
  coursesObservable: Observable<Course[]>
  constructor(public coursesService: CoursesService){
    this.coursesObservable = this.coursesService.getCourses();
  }
}
