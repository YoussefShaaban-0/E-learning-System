import { Component } from '@angular/core';
import { MenuComponent } from "../../Admin/admin-menu/menu.component";
import { AssignmentsService } from '../../../services/assignments.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Assignment } from '../../../interfaces/assignment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubmittedAssignments } from '../../../interfaces/submitted-assignments';
import { SubmittedAssignmentsService } from '../../../services/submitted-assignments.service';
import { UserMenuComponent } from "../user-menu/user-menu.component";
import { User } from '../../../interfaces/user';
import { UsersService } from '../../../services/users.service';
import { AppBarComponent } from "../../app-bar/app-bar.component";

@Component({
    selector: 'app-submit-assignment',
    standalone: true,
    templateUrl: './submit-assignment.component.html',
    styleUrl: './submit-assignment.component.css',
    imports: [MenuComponent, CommonModule, FormsModule, RouterModule, UserMenuComponent, AppBarComponent]
})
export class SubmitAssignmentComponent {
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
        score: number = 0;
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
        this.assinmentId = this.route.snapshot.paramMap.get('assignmentId');
        try {
          this.assignment = await this.assignmentService.getAssignment(this.assinmentId);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    
    
      addsubmittedAssignment() {
        const assignment: SubmittedAssignments = {
          id: '', // Generate an ID or use Firebase auto-generated ID
          userId: this.userId,
          courseId: this.assignment.courseId,
          title: this.assignment.title,
          deadline: this.assignment.deadline,
          question: this.assignment.question,
          choices: this.choices,
          // correctChoice: this.correctChoices,
          score: this.score,
          // points: this.points
        };
        this.submittedServise.addAssignment(assignment);
        this.router.navigate(['/home', this.userId]);
      }
    
}
