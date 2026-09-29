import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudentCreateRequest {
  firstName: string;
  email: string;
  course: string;
  age: number;
}

export interface StudentResponse extends StudentCreateRequest {
  id: number;
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly http = inject(HttpClient);
  private readonly studentsUrl = 'https://dummyjson.com/users/add';

  createStudent(student: StudentCreateRequest): Observable<StudentResponse> {
    return this.http.post<StudentResponse>(this.studentsUrl, student);
  }
}
