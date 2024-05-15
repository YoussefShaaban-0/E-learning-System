import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Assignment } from '../../../interfaces/assignment';
import { Observable } from 'rxjs';
import { CoursesService } from '../../../services/courses.service';
import { AssignmentsService } from '../../../services/assignments.service';
import { UserMenuComponent } from "../user-menu/user-menu.component";
import { AppBarComponent } from "../../app-bar/app-bar.component";
import { SubmittedAssignmentsService } from '../../../services/submitted-assignments.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, RouterModule, FormsModule, UserMenuComponent, AppBarComponent]
})
export class HomeComponent {

  assignments: Assignment[] = [];
  userId: any;
  
  constructor(public courseService: CoursesService, private assignmentService: SubmittedAssignmentsService,
    private router: Router, private route: ActivatedRoute){
  }
  
  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.paramMap.get('id');
    try {
      this.assignments = await this.assignmentService.getAssignmentsByUserId(this.userId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
    
  }


}
