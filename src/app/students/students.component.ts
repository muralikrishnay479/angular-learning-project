import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { Student } from './student.model';
import { APP_CONFIG, APP_LOGGER, AppConfig, AppLogger } from '../app-tokens';
import { StudentDirectoryService } from '../services/student-directory.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [StudentListComponent, RouterOutlet],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly directory = inject(StudentDirectoryService);
  private readonly config: AppConfig = inject(APP_CONFIG);
  private readonly logger: AppLogger = inject(APP_LOGGER);

  readonly students: Student[] = this.directory.getStudents();
  selectedStudentId: number | null = null;

  readonly applicationName = this.config.applicationName;
  readonly architectureDemoEnabled = this.config.enableArchitectureDemo;

  ngOnInit(): void {
    this.logger.log('StudentsComponent ngOnInit', {
      applicationName: this.applicationName,
      architectureDemoEnabled: this.architectureDemoEnabled
    });
  }

  ngAfterViewInit(): void {
    this.logger.log('StudentsComponent ngAfterViewInit');
  }

  ngOnDestroy(): void {
    this.logger.log('StudentsComponent ngOnDestroy');
  }

  selectStudent(studentId: number): void {
    this.selectedStudentId = studentId;
  }

  deleteStudent(studentId: number): void {
    const remainingStudents = this.students.filter((student) => student.id !== studentId);
    this.students.splice(0, this.students.length, ...remainingStudents);

    if (this.selectedStudentId === studentId) {
      this.selectedStudentId = null;
    }
  }
}
