import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Student } from './student.model';
import { StudentDirectoryService } from '../services/student-directory.service';

export const studentResolver: ResolveFn<Student | undefined> = (route) => {
  const id = Number(route.paramMap.get('id'));
  return inject(StudentDirectoryService).getStudentById(id);
};
