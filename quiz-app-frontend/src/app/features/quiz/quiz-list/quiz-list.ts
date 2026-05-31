import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quiz } from '../../../core/services/quiz';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-list.html',
  styleUrl: './quiz-list.scss',
})
export class QuizList implements OnInit {

  private quizService = inject(Quiz);
  private router = inject(Router);

  quizzes = signal<any[]>([]);

  ngOnInit() {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizService.getQuizzes().subscribe({
      next: (response: any) => {
        this.quizzes.set(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
