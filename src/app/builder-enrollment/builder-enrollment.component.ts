import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-builder-enrollment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './builder-enrollment.component.html',
  styleUrl: './builder-enrollment.component.css'
})
export class BuilderEnrollmentComponent {
  private readonly fb = inject(FormBuilder);

  enrollmentForm = this.fb.nonNullable.group({
    studentName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    course: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(18), Validators.max(100)]]
  });

  submitted = false;

  loadCompleteExample(): void {
    this.enrollmentForm.setValue({
      studentName: 'Maya Chen',
      email: 'maya@example.com',
      course: 'Angular Fundamentals',
      age: '28'
    });
  }

  updateNameOnly(): void {
    this.enrollmentForm.patchValue({
      studentName: 'Updated Student'
    });
  }

  onSubmit(): void {
    this.enrollmentForm.markAllAsTouched();
    this.submitted = this.enrollmentForm.valid;
  }

  resetForm(): void {
    this.enrollmentForm.reset();
    this.submitted = false;
  }
}
