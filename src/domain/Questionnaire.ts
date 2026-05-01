import type { Question } from "../types/game";
import type { IQuestion } from "./entities/entities";

export class Questionnaire {
  private _questions: IQuestion[];
  private _currentQuestionId: number;
  private _userAnswers: (number | undefined)[];
  private _visibleAnswers: boolean[];

  constructor(questions: IQuestion[]) {
    this._questions = questions;
    this._currentQuestionId = -1;
    this._userAnswers = [];
    this._visibleAnswers = [];

    Array.from({ length: questions.length }, (_) => {
      this._userAnswers.push(undefined);
      this._visibleAnswers.push(false);
    });
  }

  getCurrentQuestion(): IQuestion | null {
    return this._questions[this._currentQuestionId];
  }

  getCurrentUserAnswer(): number | undefined {
    return this._userAnswers[this._currentQuestionId];
  }

  setCurrentUserAnswer(value: number) {
    this._userAnswers[this._currentQuestionId] = value;
  }

  setCurrentVisibleAnswer(value: boolean) {
    this._visibleAnswers[this._currentQuestionId] = value;
  }

  isCurrentVisibleAnswer(): boolean {
    return this._visibleAnswers[this._currentQuestionId];
  }

  next(): IQuestion {
    this._currentQuestionId = Math.min(
      this._currentQuestionId + 1,
      this._questions.length - 1,
    );
    return this._questions[this._currentQuestionId];
  }

  prior(): IQuestion {
    this._currentQuestionId = Math.max(this._currentQuestionId - 1, 0);
    return this._questions[this._currentQuestionId];
  }
}
