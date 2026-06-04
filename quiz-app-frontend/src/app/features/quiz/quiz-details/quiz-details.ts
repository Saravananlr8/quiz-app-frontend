import { Component as AngularComponent, OnInit as AngularOnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../../core/services/quiz'; // Adjust path if necessary
import { Navbar } from '../../../layout/navbar/navbar';

// Custom structural interfaces matching your Day 7 blueprint
interface SelectedAnswer {
  questionId: number;
  optionId: number;
}

@AngularComponent({
  selector: 'app-quiz-details',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './quiz-details.html',
  styleUrl: './quiz-details.scss',
})
export class QuizDetails implements AngularOnInit {
  private route = inject(ActivatedRoute);
  private quizService = inject(Quiz);
  private router = inject(Router);

  // Core quiz state storage
  quiz = signal<any>(null);

  // Responsibilities 5: Track Selected Answers exactly as an array of objects
  selectedAnswers = signal<SelectedAnswer[]>([]);

  // Responsibilities 6: Computed property to automatically handle dynamic answered status counts
  answeredCount = computed(() => this.selectedAnswers().length);
  totalQuestionsCount = computed(() => this.quiz()?.questions?.length || 0);

  ngOnInit() {
    // Responsibilities 1: Read Quiz Id From URL parameters
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.fetchQuizData(Number(quizId));
    }
  }

  // Responsibilities 2: Call Backend API Handler
  fetchQuizData(id: number) {
    this.quizService.getQuizById(id).subscribe({
      next: (response: any) => {
        this.quiz.set(response);
      },
      error: (error) => {
        console.error('API Error details:', error);
        alert('Could not sync quiz details with the API server, da.');
      }
    });
  }

  // Responsibilities 5: Logic handler to append or update selected options arrays
  handleOptionSelection(questionId: number, optionId: number) {
    const currentAnswers = [...this.selectedAnswers()];
    const existingAnswerIndex = currentAnswers.findIndex(ans => ans.questionId === questionId);

    if (existingAnswerIndex !== -1) {
      // Update existing selection choice
      currentAnswers[existingAnswerIndex].optionId = optionId;
    } else {
      // Add new selection object entry
      currentAnswers.push({ questionId, optionId });
    }

    this.selectedAnswers.set(currentAnswers);
  }

  // Helper helper function to verify if an item is active inside the DOM loop context
  isOptionSelected(questionId: number, optionId: number): boolean {
    return this.selectedAnswers().some(ans => ans.questionId === questionId && ans.optionId === optionId);
  }

  // Responsibilities 7: Print payload to console cleanly on submit execution
  onSubmitQuiz() {
    console.log('============= DAY 7 SUBMISSION TARGET PAYLOAD =============');
    console.log('Selected Answers Array Structure:', this.selectedAnswers());
    console.log('===========================================================');

    alert('Answers logged to console flawlessly, da! Check your Developer inspect panel. 🚀');

    // Day 8 will wire this to backend Attempt API, for now we gracefully navigate back
    this.router.navigate(['/quizzes']);
  }
}
