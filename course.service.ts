import { Injectable } from '@angular/core';
import { course } from '../model/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private storageKey = 'courses';
  private nextId = 1;

  constructor() {
    // Initialize nextId from existing data
    const existingCourses = this.getCourses();
    if (existingCourses.length > 0) {
      this.nextId = Math.max(...existingCourses.map(c => c.id)) + 1;
    }
  }

  // ✅ Add a new course
  addCourse(courseData: Omit<course, 'id'>): void {
    const newCourse: course = {
      ...courseData,
      id: this.nextId++
    };
    const courses = this.getCourses();
    courses.push(newCourse);
    localStorage.setItem(this.storageKey, JSON.stringify(courses));
  }

  // ✅ Get all courses
  getCourses(): course[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // ✅ Delete a course by id
  deleteCourse(id: number): void {
    let courses = this.getCourses();
    courses = courses.filter(c => c.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(courses));
  }

  // ✅ Get one course by id (for editing)
  getCourseById(id: number): course | undefined {
    const courses = this.getCourses();
    return courses.find(c => c.id === id);
  }

  // ✅ Update course by id
  updateCourse(updatedCourse: course): void {
    let courses = this.getCourses();
    courses = courses.map(c => (c.id === updatedCourse.id ? updatedCourse : c));
    localStorage.setItem(this.storageKey, JSON.stringify(courses));
  }
}
