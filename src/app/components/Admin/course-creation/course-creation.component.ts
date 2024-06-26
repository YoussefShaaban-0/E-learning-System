import { Component } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { Course } from '../../../interfaces/course';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "../admin-menu/menu.component";

@Component({
    selector: 'app-course-creation',
    standalone: true,
    templateUrl: './course-creation.component.html',
    styleUrl: './course-creation.component.css',
    imports: [CommonModule, ReactiveFormsModule, MenuComponent]
})
export class CourseCreationComponent {

  constructor(private coursesService: CoursesService, private router: Router, private fb: FormBuilder){
   

  }



  addcourse(title: any, description: any, img: any){
    this.coursesService.addCourse(title.value, description.value, img.value)
    title.value = ''; 
    description.value = '';
    img.value = '';
    this.router.navigate(['/admin-courses'])
  }

  // selectedImage: string | ArrayBuffer | null = null;

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     const file = input.files[0];
  //     const reader = new FileReader();
      
  //     reader.onload = () => {
  //       this.selectedImage = reader.result;
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // }

}
