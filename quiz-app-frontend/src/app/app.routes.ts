import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { QuizList } from './features/quiz/quiz-list/quiz-list';
import { CreateQuiz } from './features/quiz/create-quiz/create-quiz';
import { QuizDetails } from './features/quiz/quiz-details/quiz-details';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'quizzes',
    component: QuizList,
    canActivate: [authGuard]
  },
  {
    path: 'quizzes/:id',
    component: QuizDetails,
    canActivate: [authGuard]
  },
  {
    path: 'create-quiz',
    component: CreateQuiz,
    canActivate: [authGuard]
  }
];
