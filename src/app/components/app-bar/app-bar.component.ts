import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.css'
})
export class AppBarComponent {
  userId: any;
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
  
  constructor(private route: ActivatedRoute, private router: Router, private userServices: UsersService){
  }

  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.paramMap.get('id');
    try {
      this.user = await this.userServices.getUser(this.userId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

}
