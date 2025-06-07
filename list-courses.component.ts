import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { course } from '../model/course.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  imports: [CommonModule],
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {
  courses: course[] = [];

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses(); // Load course list
  }

  loadCourses(): void {
    this.courses = this.courseService.getCourses();
  }

  editCourse(id: number): void {
    this.router.navigate(['/edit-course', id]); // Navigate to edit page
  }

  deleteCourse(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this course?');
    if (confirmDelete) {
      this.courseService.deleteCourse(id);  // You'll add this method in the service
      this.loadCourses(); // Refresh course list
    }
  }
}
