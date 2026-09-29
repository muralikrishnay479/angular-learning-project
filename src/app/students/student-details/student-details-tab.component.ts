import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-details-tab',
  standalone: true,
  templateUrl: './student-details-tab.component.html',
  styleUrl: './student-details-tab.component.css'
})
export class StudentDetailsTabComponent {
  private readonly route = inject(ActivatedRoute);
  readonly student = this.route.parent?.snapshot.data['student'] as Student | undefined;
}
