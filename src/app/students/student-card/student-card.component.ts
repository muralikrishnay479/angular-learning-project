import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-card',
  standalone: true,
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css'
})
export class StudentCardComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input({ required: true }) student!: Student;
  @Input() selected = false;

  @Output() studentSelected = new EventEmitter<number>();
  @Output() deleteRequested = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected']) {
      console.log('StudentCard ngOnChanges:', this.student?.name, 'selected =', this.selected);
    }
  }

  ngOnInit(): void {
    console.log('StudentCard ngOnInit:', this.student.name);
  }

  ngAfterViewInit(): void {
    console.log('StudentCard ngAfterViewInit:', this.student.name);
  }

  ngOnDestroy(): void {
    console.log('StudentCard ngOnDestroy:', this.student.name);
  }

  selectStudent(): void {
    this.studentSelected.emit(this.student.id);
  }

  requestDelete(): void {
    this.deleteRequested.emit(this.student.id);
  }
}
