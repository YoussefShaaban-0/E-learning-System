import { Routes } from '@angular/router';
import { FirstComponent } from './components/first/first.component';
import { LoginComponent } from './components/first/login/login.component';
import { RegisterComponent } from './components/first/register/register.component';
import { CoursesComponent } from './components/User/courses/courses.component';
import { ProfileComponent } from './components/User/profile/profile.component';
import { CourseCreationComponent } from './components/Admin/course-creation/course-creation.component';
import { AssignmentComponent } from './components/User/assignment/assignment.component';
import { MenuComponent } from './components/Admin/admin-menu/menu.component';
import { ApprovalsComponent } from './components/Admin/approvals/approvals.component';
import { UpdateUserComponent } from './components/Admin/update-user/update-user.component';
import { AddMaterialsComponent } from './components/Admin/add-materials/add-materials.component';
import { AdminCoursesComponent } from './components/Admin/admin-courses/admin-courses.component';
import { HomeComponent } from './components/User/home/home.component';
import { MaterialsComponent } from './components/User/materials/materials.component';
import { ExamcreationComponent } from './components/examcreation/examcreation.component';

export const routes: Routes = [
    // {path: '',component: FirstComponent},
    {path: '', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'course', component: CoursesComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'assignment-creation/:id', component: ExamcreationComponent},
    {path: 'course-creation', component: CourseCreationComponent},
    {path: 'assignment', component: AssignmentComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'approvals', component: ApprovalsComponent},
    {path: 'updateuser/:id', component: UpdateUserComponent},
    {path: 'add-materials/:id', component: AddMaterialsComponent},
    {path: 'admin-courses', component: AdminCoursesComponent},
    {path: 'materials/:id', component: MaterialsComponent}
];
