import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StudentsComponent } from './students/students.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent,  },
  { path: 'courses', component: CoursesComponent, canActivate: [authGuard]  },
  { path: 'courses/:id', component: CoursesComponent },
  { path: 'students', component: StudentsComponent, canActivate: [authGuard]  },
  { path: '**', component: NotFoundComponent }
];
