import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  readonly student = this.route.snapshot.data['student'] as Student | undefined;
  readonly sectionTitle = this.route.snapshot.data['sectionTitle'] as string;
}
