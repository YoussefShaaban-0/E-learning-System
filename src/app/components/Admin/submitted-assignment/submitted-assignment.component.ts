import { Component } from '@angular/core';
import { MenuComponent } from "../admin-menu/menu.component";
import { AssignmentsService } from '../../../services/assignments.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Assignment } from '../../../interfaces/assignment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubmittedAssignments } from '../../../interfaces/submitted-assignments';
import { SubmittedAssignmentsService } from '../../../services/submitted-assignments.service';
// import { UserMenuComponent } from "../user-menu/user-menu.component";
import { User } from '../../../interfaces/user';
import { UsersService } from '../../../services/users.service';

// import { MenuComponent } from "../admin-menu/menu.component";

@Component({
    selector: 'app-submitted-assignment',
    standalone: true,
    templateUrl: './submitted-assignment.component.html',
    styleUrl: './submitted-assignment.component.css',
    imports: [MenuComponent, CommonModule, FormsModule, RouterModule]
})
export class SubmittedAssignmentComponent {
  score: number = 0;
  userId: any;
    assinmentId: any;
    assignment: Assignment = {
        id: '',
        choices: ['choices'], // Handle choices as an array (default to empty array if not found)
        //correctChoices: assignmentData['correctChoices'] || [], // Handle correctChoices as an array (default to empty array if not found)
        courseId: 'this.courseId',
        deadline: 'deadline',
        question: ['question'],
        score: 0,
        title:'title'
        // Add other properties as needed
      };
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
        // for assignments
        title: string = '';
        deadline: string = '';
        questions: string[] = [];
        choices: string[] = [];
        correctChoices: boolean[] = [];
        // score: number[] = [];
        points: number = 0;
        // coursename: string = '';

    constructor(private submittedServise: SubmittedAssignmentsService, private route: ActivatedRoute, 
      private router: Router, private assignmentService: AssignmentsService, private userservice: UsersService){}

    async ngOnInit(): Promise<void> {
      this.userId = this.route.snapshot.paramMap.get('id');
    try {
      this.user = await this.userservice.getUser(this.userId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
        this.assinmentId = this.route.snapshot.paramMap.get('id');
        try {
          this.assignment = await this.submittedServise.getAssignment(this.assinmentId);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
      addScore(){
     this.submittedServise.addScore(this.assinmentId, this.score);
    //  this.assignmentService.addScore(this.assinmentId, this.score);
     this.router.navigate(['/submitted-assignments']);
      }
    
}
