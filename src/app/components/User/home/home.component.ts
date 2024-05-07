import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Assignment } from '../../../interfaces/assignment';
import { Observable } from 'rxjs';
import { CoursesService } from '../../../services/courses.service';
import { AssignmentsService } from '../../../services/assignments.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  // courseName$: Observable<string>;
  assignmentObservable: Observable<Assignment[]>

  constructor(public courseService: CoursesService,private assignmentService: AssignmentsService){
    this.assignmentObservable = this.assignmentService.getAssignment();
  }
  
 ngOnInit() {
    
  }

  getname(id: string){
    // this.courseName$ = this.assignmentService.getCoursename(id);
  }

}
