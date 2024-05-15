import { Component } from '@angular/core';
import { UserMenuComponent } from "../user-menu/user-menu.component";

@Component({
    selector: 'app-assignment',
    standalone: true,
    templateUrl: './assignment.component.html',
    styleUrl: './assignment.component.css',
    imports: [UserMenuComponent]
})
export class AssignmentComponent {

}
