import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, RouterModule, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { User } from '../../../interfaces/user';
import { MenuComponent } from "../admin-menu/menu.component";

@Component({
    selector: 'app-update-user',
    standalone: true,
    templateUrl: './update-user.component.html',
    styleUrl: './update-user.component.css',
    imports: [CommonModule, FormsModule, RouterModule, MenuComponent]
})
export class UpdateUserComponent {

  userId: any;
  user: User = {
    id: '',
    username: 'username',
    email: 'email',
    role: 'role',
    waiting: true,
    password: 'password',
  };

  constructor(private userservice: UsersService, private route: ActivatedRoute, private router: Router){
  }

  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.paramMap.get('id');
    try {
      this.user = await this.userservice.getUser(this.userId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  updateuser()
  {
    this.userservice.updateUser(this.userId, this.user);
    this.router.navigate(['/approvals'])
  }
}
