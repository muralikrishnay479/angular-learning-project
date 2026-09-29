import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { BuilderEnrollmentComponent } from './builder-enrollment/builder-enrollment.component';
import { AsyncDemoComponent } from './async-demo/async-demo.component';
import { ApiProductsComponent } from './api-products/api-products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StudentsComponent } from './students/students.component';
import { studentResolver } from './students/student-resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'enrollment', component: EnrollmentComponent, canActivate: [authGuard] },
  { path: 'builder-enrollment', component: BuilderEnrollmentComponent, canActivate: [authGuard] },
  { path: 'async-demo', component: AsyncDemoComponent, canActivate: [authGuard] },
  { path: 'api-products', component: ApiProductsComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursesComponent, canActivate: [authGuard] },
  { path: 'courses/:id', component: CoursesComponent },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: ':id',
        resolve: { student: studentResolver },
        data: { sectionTitle: 'Student details' },
        loadComponent: () =>
          import('./students/student-details/student-details.component').then(
            (module) => module.StudentDetailsComponent
          ),
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./students/student-details/student-details.routes').then(
                (module) => module.STUDENT_DETAILS_ROUTES
              )
          }
        ]
      }
    ]
  },
  { path: '**', component: NotFoundComponent }
];
