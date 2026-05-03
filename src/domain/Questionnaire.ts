import type { IQuestion } from "./entities/entities";

export class Questionnaire {
  private _questions: IQuestion[];
  private _currentQuestionIndex: number;
  private _userAnswers: (number | undefined)[];
  private _visibleAnswers: boolean[];

  constructor(questions: IQuestion[]) {
    this._questions = questions;
    this._currentQuestionIndex = -1;
    this._userAnswers = [];
    this._visibleAnswers = [];

    Array.from({ length: questions.length }, (_) => {
      this._userAnswers.push(undefined);
      this._visibleAnswers.push(false);
    });
  }

  getCurrentQuestion(): IQuestion | null {
    return this._questions[this._currentQuestionIndex];
  }

  getCurrentUserAnswer(): number | undefined {
    return this._userAnswers[this._currentQuestionIndex];
  }

  getCurrentQuestionIndex(): number {
    return this._currentQuestionIndex;
  }

  setCurrentUserAnswer(value: number) {
    this._userAnswers[this._currentQuestionIndex] = value;
  }

  setCurrentVisibleAnswer(value: boolean) {
    this._visibleAnswers[this._currentQuestionIndex] = value;
  }

  isCurrentVisibleAnswer(): boolean {
    return this._visibleAnswers[this._currentQuestionIndex];
  }

  next(): IQuestion {
    this._currentQuestionIndex = Math.min(
      this._currentQuestionIndex + 1,
      this._questions.length - 1,
    );
    return this._questions[this._currentQuestionIndex];
  }

  prior(): IQuestion {
    this._currentQuestionIndex = Math.max(this._currentQuestionIndex - 1, 0);
    return this._questions[this._currentQuestionIndex];
  }
}
