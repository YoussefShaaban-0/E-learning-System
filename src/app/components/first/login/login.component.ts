import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  myForm: FormGroup;
  errorMessages: string[] = [];
  // user: User = {
  //   id: '',
  //   username: 'username',
  //   email: 'email',
  //   role: 'student',
  //   waiting: true,
  //   password: 'password',
  // };


  constructor(private userService: UsersService, private router: Router, private formBuilder: FormBuilder){
      this.myForm = this.formBuilder.group({
        // name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
  }

  login2(form: FormGroup) {
    this.userService.login(form.value.email, form.value.password).then((isValid: boolean) => {
      if (isValid) {
        this.errorMessages.push('Login successful');
        this.router.navigate(['/home']);
      } else {
        this.errorMessages.push('Incorrect email or password');
        // Handle incorrect email or password
      }
    });
  }

  login(form: FormGroup) {
    this.userService.login(form.value.email, form.value.password).then((isValid: boolean) => {
      if (isValid) {
        this.userService.getUserByEmail(form.value.email).then(user => {
            if (user.role === 'admin') {
              this.router.navigate(['/approvals']);
            } else if (user.role === 'student') {
              this.router.navigate(['/home', user.id]);
              // ['/home', user.id]
            } else {
              this.router.navigate(['/admin-courses']);
            }

          });
      } else {
        this.errorMessages.push('Incorrect email or password');
        // Handle incorrect email or password
      }
    });
  }
  

  // .subscribe((user: User) => {
  //   if (user && user.role === 'Admin') {
  //     this.router.navigate(['/admin']);
  //   } else {
  //     this.router.navigate(['/user']);
  //   }
  // });
}
