import { Component } from '@angular/core';
import { MenuComponent } from "../admin-menu/menu.component";
import { UsersService } from '../../../services/users.service';
import { SubmittedAssignments } from '../../../interfaces/submitted-assignments';
import { Observable } from 'rxjs';
import { SubmittedAssignmentsService } from '../../../services/submitted-assignments.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-submitted-assiignments',
    standalone: true,
    templateUrl: './submitted-assiignments.component.html',
    styleUrl: './submitted-assiignments.component.css',
    imports: [CommonModule, RouterModule, FormsModule, MenuComponent]
})
export class SubmittedAssiignmentsComponent {

    assignmentsObservable: Observable<SubmittedAssignments[]>
    constructor(public assignmentsService: SubmittedAssignmentsService){
        this.assignmentsObservable = this.assignmentsService.getAssignments();
      }

      
}
