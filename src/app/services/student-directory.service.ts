import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from '../students/student.model';

@Injectable({ providedIn: 'root' })
export class StudentDirectoryService {
  private readonly students: Student[] = [
    { id: 1, name: 'Anita Rao', email: 'anita@example.com', course: 'Angular Fundamentals' },
    { id: 2, name: 'Rahul Kumar', email: 'rahul@example.com', course: 'TypeScript Basics' },
    { id: 3, name: 'Meera Shah', email: 'meera@example.com', course: 'RxJS Essentials' }
  ];

  getStudents(): Student[] {
    return this.students.map((student) => ({ ...student }));
  }

  getStudentById(id: number): Observable<Student | undefined> {
    return of(this.students.find((student) => student.id === id));
  }
}
