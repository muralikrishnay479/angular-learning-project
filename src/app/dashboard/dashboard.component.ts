import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgClass,
  PercentPipe,
  TitleCasePipe,
  UpperCasePipe,
  LowerCasePipe
} from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  courses;
  courseCount
  studentName = 'aLEX morgan';
  totalCourses = 5;
  completedCourses = 2;
  averageScore = 87.456;
  courseMessage = 'Select the button to see a course message.';
  courseButtonTitle = 'Show information about the LMS courses';

  constructor(private readonly courseService: CourseService) {
    this.courses = this.courseService.getCourses();
    this.courseCount = this.courseService.getCourseCount();
  }

  // Dependency Injection using inject():
  // private readonly courseService = inject(CourseService);
  // courses = this.courseService.getCourses();
  // courseCount = this.courseService.getCourseCount();

  showCourseMessage(): void {
    this.courseMessage = 'You are viewing your course overview.';
  }
}
