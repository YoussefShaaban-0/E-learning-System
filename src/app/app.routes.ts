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
import { ExamcreationComponent } from './components/Admin/examcreation/examcreation.component';
import { SubmitAssignmentComponent } from './components/User/submit-assignment/submit-assignment.component';
import { UserCorsesComponent } from './components/User/user-corses/user-corses.component';
import { SubmittedAssiignmentsComponent } from './components/Admin/submitted-assiignments/submitted-assiignments.component';
import { SubmittedAssignmentsService } from './services/submitted-assignments.service';
import { SubmittedAssignmentComponent } from './components/Admin/submitted-assignment/submitted-assignment.component';

export const routes: Routes = [
    // {path: '',component: FirstComponent},
    {path: '', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home/:id', component: HomeComponent},
    {path: 'course/:id', component: CoursesComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'assignment-creation/:id', component: ExamcreationComponent},
    {path: 'course-creation', component: CourseCreationComponent},
    {path: 'assignment', component: AssignmentComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'approvals', component: ApprovalsComponent},
    {path: 'updateuser/:id', component: UpdateUserComponent},
    {path: 'add-materials/:id', component: AddMaterialsComponent},
    {path: 'admin-courses', component: AdminCoursesComponent},
    {path: 'materials/:id/:mid', component: MaterialsComponent},
    {path: 'submit-assignment/:id/:assignmentId', component: SubmitAssignmentComponent},
    {path: 'user-course/:id', component: UserCorsesComponent},
    {path: 'submitted-assignments', component: SubmittedAssiignmentsComponent},
    {path: 'submitted-assignment/:id', component: SubmittedAssignmentComponent}
];
