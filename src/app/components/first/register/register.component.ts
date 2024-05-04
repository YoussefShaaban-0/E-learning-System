import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  myForm: FormGroup;

  constructor(private usersService: UsersService, private router: Router, private formBuilder: FormBuilder){
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }


  adduser(form: FormGroup){
    this.usersService.addUser(form.value.username, form.value.email, form.value.password)
    form.value.username = ''; 
    form.value.email = '';
    form.value.password = '';
    console.log('User added successfully');
    this.router.navigate(['/login'])
  }

}
