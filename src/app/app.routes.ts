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

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'enrollment', component: EnrollmentComponent, canActivate: [authGuard] },
  { path: 'builder-enrollment', component: BuilderEnrollmentComponent, canActivate: [authGuard] },
  { path: 'async-demo', component: AsyncDemoComponent, canActivate: [authGuard] },
  { path: 'api-products', component: ApiProductsComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent,  },
  { path: 'courses', component: CoursesComponent, canActivate: [authGuard]  },
  { path: 'courses/:id', component: CoursesComponent },
  { path: 'students', component: StudentsComponent, canActivate: [authGuard]  },
  { path: '**', component: NotFoundComponent }
];
