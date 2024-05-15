import { Component } from '@angular/core';
import { UserMenuComponent } from "../user-menu/user-menu.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [UserMenuComponent]
})
export class ProfileComponent {

}
