import { CurrencyPipe, DatePipe, PercentPipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, PercentPipe, TitleCasePipe, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  private readonly courseService = inject(CourseService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  courses = this.courseService.getCourses();
  selectedCourse = this.getSelectedCourse();

  private getSelectedCourse() {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? this.courseService.getCourseById(Number(id)) : undefined;
  }

  goToCourses(): void {
    this.router.navigate(['/courses']);
  }
}
