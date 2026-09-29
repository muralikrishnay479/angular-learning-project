import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudentResponse, StudentService } from '../services/student.service';

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.css'
})
export class EnrollmentComponent implements OnDestroy {
  private readonly studentService = inject(StudentService);
  private readonly subscriptions = new Subscription();

  enrollmentForm = new FormGroup({
    studentName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    course: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    age: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.min(18), Validators.max(100)]
    })
  });

  submittedValues: {
    studentName: string;
    email: string;
    course: string;
    age: string;
  } | null = null;
  createdStudent: StudentResponse | null = null;
  updatedStudent: StudentResponse | null = null;
  updateMethod = '';
  updating = false;
  updateError = '';
  submitting = false;
  submitError = '';

  get studentName() {
    return this.enrollmentForm.controls.studentName;
  }

  get email() {
    return this.enrollmentForm.controls.email;
  }

  get course() {
    return this.enrollmentForm.controls.course;
  }

  get age() {
    return this.enrollmentForm.controls.age;
  }

  onSubmit(): void {
    this.enrollmentForm.markAllAsTouched();

    if (this.enrollmentForm.invalid) {
      this.submittedValues = null;
      return;
    }

    this.submittedValues = this.enrollmentForm.getRawValue();
    this.createdStudent = null;
    this.submitError = '';
    this.submitting = true;

    const formValue = this.enrollmentForm.getRawValue();
    this.subscriptions.add(
      this.studentService.createStudent({
        firstName: formValue.studentName,
        email: formValue.email,
        course: formValue.course,
        age: Number(formValue.age)
      }).subscribe({
        next: (student) => {
          this.createdStudent = student;
          this.submitting = false;
        },
        error: () => {
          this.submitError = 'The student could not be created.';
          this.submitting = false;
        }
      })
    );
  }

  resetForm(): void {
    this.enrollmentForm.reset();
    this.submittedValues = null;
    this.createdStudent = null;
    this.submitError = '';
    this.submitting = false;
    this.updatedStudent = null;
    this.updateMethod = '';
    this.updateError = '';
  }

  updateWithPut(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }

    const formValue = this.enrollmentForm.getRawValue();
    this.updating = true;
    this.updateError = '';
    this.subscriptions.add(
      this.studentService.updateStudentWithPut(1, {
        firstName: formValue.studentName,
        email: formValue.email,
        course: formValue.course,
        age: Number(formValue.age)
      }).subscribe({
        next: (student) => {
          this.updatedStudent = student;
          this.updateMethod = 'PUT';
          this.updating = false;
        },
        error: () => {
          this.updateError = 'The PUT update failed.';
          this.updating = false;
        }
      })
    );
  }

  updateWithPatch(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }

    this.updating = true;
    this.updateError = '';
    this.subscriptions.add(
      this.studentService.updateStudentWithPatch(1, {
        email: this.enrollmentForm.controls.email.value
      }).subscribe({
        next: (student) => {
          this.updatedStudent = student;
          this.updateMethod = 'PATCH';
          this.updating = false;
        },
        error: () => {
          this.updateError = 'The PATCH update failed.';
          this.updating = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
