import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../student.model';
import { StudentCardComponent } from '../student-card/student-card.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [StudentCardComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  @Input({ required: true }) students: Student[] = [];
  @Input() selectedStudentId: number | null = null;

  @Output() studentSelected = new EventEmitter<number>();
  @Output() studentDeleted = new EventEmitter<number>();

  selectStudent(studentId: number): void {
    this.studentSelected.emit(studentId);
  }

  deleteStudent(studentId: number): void {
    this.studentDeleted.emit(studentId);
  }
}
