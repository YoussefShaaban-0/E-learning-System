import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Observable } from 'rxjs';
import { User } from '../../../interfaces/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuComponent } from "../admin-menu/menu.component";


@Component({
    selector: 'app-approvals',
    standalone: true,
    templateUrl: './approvals.component.html',
    styleUrl: './approvals.component.css',
    imports: [CommonModule, RouterModule, FormsModule, MenuComponent]
})
export class ApprovalsComponent {

  usersObservable: Observable<User[]>

  constructor(public usersService: UsersService){
    this.usersObservable = this.usersService.getUsers();
  }

  deleteUser(id: string){
    this.usersService.deleteUser(id);
  }

  // updateUser(id: string, username: string, email: string, password: string){
  //   this.usersService.updateUser(id);
  // }

}
