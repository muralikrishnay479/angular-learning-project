import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.css'
})
export class EnrollmentComponent {
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
  }

  resetForm(): void {
    this.enrollmentForm.reset();
    this.submittedValues = null;
  }
}
