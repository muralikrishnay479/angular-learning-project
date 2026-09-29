import { Routes } from '@angular/router';

export const STUDENT_DETAILS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./student-details-tab.component').then(
        (module) => module.StudentDetailsTabComponent
      )
  }
];
