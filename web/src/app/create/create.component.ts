import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from '../models/student.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  student: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    major: '',
    averageGrade: 0,
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    const studentWithoutId = {
      ...this.student,
      id: undefined,
      averageGrade: Number(this.student.averageGrade),
    };
    const data = {
      student: studentWithoutId,
    }
    console.log(studentWithoutId);

    this.http.post('http://localhost:5000/students', data).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
