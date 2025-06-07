import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { course } from '../model/course.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-course',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], 
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  courseForm!: FormGroup;
  submitted = false;
  successMessage = '';
  isEditMode = false;
  courseId!: number;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required]
    });

    // Check if this is edit mode
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.courseId = +idParam;
        const existingCourse = this.courseService.getCourseById(this.courseId);
        if (existingCourse) {
          this.courseForm.patchValue(existingCourse); // Pre-fill form
        }
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.courseForm.invalid) return;

    const courseData = this.courseForm.value;

    if (this.isEditMode) {
      const updatedCourse: course = {
        ...courseData,
        id: this.courseId
      };
      this.courseService.updateCourse(updatedCourse);
      this.successMessage = 'Course updated successfully!';
    } else {
      this.courseService.addCourse(courseData);
      this.successMessage = 'Course created successfully!';
      this.courseForm.reset();
      this.submitted = false;
    }

    // Optional: Navigate back to list after delay
    setTimeout(() => {
      this.router.navigate(['/list-courses']);
    }, 1000);
  }
}
