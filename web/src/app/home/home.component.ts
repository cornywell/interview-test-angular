import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  major: string;
  averageGrade: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public students: Student[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
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
}
