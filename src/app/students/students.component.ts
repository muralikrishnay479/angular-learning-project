import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { StudentListComponent } from './student-list/student-list.component';
import { Student } from './student.model';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [StudentListComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit, AfterViewInit, OnDestroy {
  students: Student[] = [
    { id: 1, name: 'Anita Rao', email: 'anita@example.com', course: 'Angular Fundamentals' },
    { id: 2, name: 'Rahul Kumar', email: 'rahul@example.com', course: 'TypeScript Basics' },
    { id: 3, name: 'Meera Shah', email: 'meera@example.com', course: 'RxJS Essentials' }
  ];

  selectedStudentId: number | null = null;

  ngOnInit(): void {
    console.log('StudentsComponent ngOnInit: parent is ready');
  }

  ngAfterViewInit(): void {
    console.log('StudentsComponent ngAfterViewInit: child list view is ready');
  }

  ngOnDestroy(): void {
    console.log('StudentsComponent ngOnDestroy: parent and child tree is being removed');
  }

  selectStudent(studentId: number): void {
    this.selectedStudentId = studentId;
  }

  deleteStudent(studentId: number): void {
    this.students = this.students.filter((student) => student.id !== studentId);

    if (this.selectedStudentId === studentId) {
      this.selectedStudentId = null;
    }
  }
}
