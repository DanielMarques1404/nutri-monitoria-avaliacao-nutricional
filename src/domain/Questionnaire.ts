import type { QuizQuestion } from "../types/game";

export class Questionnaire {
  private _questions: QuizQuestion[];
  private _currentQuestionId: number;
  private _userAnswers: ("A" | "B" | "C" | "D" | undefined)[];
  private _visibleAnswers: boolean[];

  constructor(questions: QuizQuestion[]) {
    this._questions = questions;
    this._currentQuestionId = -1;
    this._userAnswers = [];
    this._visibleAnswers = [];

    Array.from({ length: questions.length }, (_) => {
      this._userAnswers.push(undefined);
      this._visibleAnswers.push(false);
    });
  }

  getCurrentQuestion(): QuizQuestion | null {
    return this._questions[this._currentQuestionId];
  }

  getCurrentUserAnswer(): "A" | "B" | "C" | "D" | undefined {
    return this._userAnswers[this._currentQuestionId];
  }

  setCurrentUserAnswer(value: "A" | "B" | "C" | "D") {
    this._userAnswers[this._currentQuestionId] = value;
  }

  setCurrentVisibleAnswer(value: boolean) {
    this._visibleAnswers[this._currentQuestionId] = value;
  }

  isCurrentVisibleAnswer(): boolean {
    return this._visibleAnswers[this._currentQuestionId];
  }

  next(): QuizQuestion {
    this._currentQuestionId = Math.min(
      this._currentQuestionId + 1,
      this._questions.length - 1,
    );
    return this._questions[this._currentQuestionId];
  }

  prior(): QuizQuestion {
    this._currentQuestionId = Math.max(this._currentQuestionId - 1, 0);
    return this._questions[this._currentQuestionId];
  }
}
