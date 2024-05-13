import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from '../models/student.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public students: Student[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    http.get<Student[]>(baseUrl + 'students').subscribe({
      next: (result) => {
        this.students = result;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {}

  getBootstrapRowStyle(grade: number): string {
    if (grade >= 80) {
      return 'table-success';
    } else if (grade >= 50) {
      return 'table-warning';
    } else {
      return 'table-danger';
    }
  }

  deleteStudent(email: string): void {
    const student = this.students.find((student) => student.email === email);
    const studentName = `${student?.firstName} ${student?.lastName}`
    const url = `http://localhost:5000/Students/${email}`;
    if (!confirm(`Are you sure you want to delete ${studentName}?`)) {
      return;
    }
    this.http.delete(url).subscribe({
      next: () => {
        const updatedStudents = this.students.filter(student => student.email !== email);
        this.students = updatedStudents;
      },
      error: (error) => {
        console.error('There was an error deleting the student:', error);
      },
    });
  }

}