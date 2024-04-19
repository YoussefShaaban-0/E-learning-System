import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {

}
