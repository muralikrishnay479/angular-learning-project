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
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  studentName = 'aLEX morgan';
  totalCourses = 5;
  completedCourses = 2;
  averageScore = 87.456;
  courses = [
    {
      name: 'angular fundamentals',
      instructor: 'Maya Chen',
      price: 1299.5,
      progress: 0.75,
      startDate: new Date(2026, 8, 14)
    },
    {
      name: 'typescript for web apps',
      instructor: 'Jamal Rivera',
      price: 899,
      progress: 0.4,
      startDate: new Date(2026, 9, 5)
    }
  ];
  courseMessage = 'Select the button to see a course message.';
  courseButtonTitle = 'Show information about the LMS courses';

  showCourseMessage(): void {
    this.courseMessage = 'You are viewing your course overview.';
  }
}
