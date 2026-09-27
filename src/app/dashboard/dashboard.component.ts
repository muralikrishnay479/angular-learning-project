import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  studentName = 'Alex';
  totalCourses = 5;
  completedCourses = 2;
  courses = ['Angular', 'TypeScript', 'HTML', 'CSS'];
  courseMessage = 'Select the button to see a course message.';
  courseButtonTitle = 'Show information about the LMS courses';

  showCourseMessage(): void {
    this.courseMessage = 'You are viewing your course overview.';
  }
}
