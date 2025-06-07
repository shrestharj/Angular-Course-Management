import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCourseComponent } from './create-course/create-course.component';
import { ListCoursesComponent } from  './list-courses/list-courses.component';

const routes: Routes = [
  { path: 'create-course', component: CreateCourseComponent },
  { path: 'list-courses', component: ListCoursesComponent },
  { path: '', redirectTo: 'create-course', pathMatch: 'full' }, 
 { path: 'edit-course/:id',
  component: CreateCourseComponent}// Optional default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
