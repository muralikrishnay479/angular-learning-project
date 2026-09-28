import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly courses = [
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

  getCourses() {
    return this.courses;
  }

  getCourseCount(): number {
    return this.courses.length;
  }

  getCourseById(id: number) {
    return this.courses[id];
  }
}
