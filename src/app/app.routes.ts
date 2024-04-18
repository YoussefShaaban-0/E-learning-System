import { Routes } from '@angular/router';
import { FirstComponent } from './components/first/first.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExamcreationComponent } from './components/examcreation/examcreation.component';

export const routes: Routes = [
    {path: '',component: FirstComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'course', component: CoursesComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'exam creation', component: ExamcreationComponent}
];
