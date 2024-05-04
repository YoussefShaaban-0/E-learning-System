import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../Admin/admin-menu/menu.component';
import { CoursesService } from '../../../services/courses.service';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../interfaces/course';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  coursesObservable: Observable<Course[]>
  constructor(public coursesService: CoursesService){
    this.coursesObservable = this.coursesService.getCourses();
  }

  ngOnInit(): void {
      
  }
}
