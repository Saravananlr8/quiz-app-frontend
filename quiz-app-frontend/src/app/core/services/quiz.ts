import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Quiz {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:5116/api/quiz';

  getQuizzes() {
      return this.http.get(
          `${this.apiUrl}/quizzes`
      );
  }
}
