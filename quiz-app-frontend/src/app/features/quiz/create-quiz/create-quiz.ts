import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Quiz } from '../../../core/services/quiz'; // Adjust path if needed
import { Navbar } from '../../../layout/navbar/navbar';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './create-quiz.html',
  styleUrl: './create-quiz.scss',
})
export class CreateQuiz {
  private quizService = inject(Quiz);
  private router = inject(Router);

  // Task 2: Bind Form Data Object Structure
  quiz = {
    title: '',
    description: '',
    durationInMinutes: 0,
    questions: [
      {
        questionText: '',
        marks: 1,
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false } // Initializing with 2 options makes it easy to fill out!
        ]
      }
    ]
  };

  // Task 3: Add Question Button Logic
  addQuestion() {
    this.quiz.questions.push({
      questionText: '',
      marks: 1,
      options: [
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false }
      ]
    });
  }

  // Task 4: Add Option Button Logic
  addOption(question: any) {
    question.options.push({
      optionText: '',
      isCorrect: false
    });
  }

  // Helper to quickly handle checking a correct option checkbox
  setCorrectOption(question: any, selectedOptionIndex: number) {
    // If it's a single-choice quiz, reset other checkboxes in this question block
    question.options.forEach((opt: any, index: number) => {
      opt.isCorrect = index === selectedOptionIndex;
    });
  }

  // Task 5: Call Backend API & Submit
  submitQuiz() {
    // Basic validation check before firing
    if (!this.quiz.title || this.quiz.questions.length === 0) {
      alert('Please fill out the Quiz Title and add at least one question da!');
      return;
    }

    console.log('Payload being sent to API:', this.quiz);

    this.quizService.createQuiz(this.quiz).subscribe({
      next: (response: any) => {
        alert('Quiz Created successfully 🎉');
        this.router.navigate(['/quizzes']); // Take user back to the dashboard grid
      },
      error: (err) => {
        console.error('API Error:', err);
        alert('Something went wrong while creating the quiz.');
      }
    });
  }
}
