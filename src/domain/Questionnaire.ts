import type { QuizQuestion } from "../types/game";

export class Question {
  private _question: QuizQuestion;
  private _userAnswer: "A" | "B" | "C" | "D" | undefined;

  constructor(
    question: QuizQuestion,
    userAnswer?: "A" | "B" | "C" | "D" | undefined,
  ) {
    this._question = question;
    this._userAnswer = userAnswer;
  }

  setAnswer(answer: "A" | "B" | "C" | "D") {
    this._userAnswer = answer;
  }

  getUserAnswer(): "A" | "B" | "C" | "D" | undefined {
    return this._userAnswer;
  }

  getQuestion(): QuizQuestion {
    return this._question;
  }
}

export class Questionnaire {
  private _questions: Question[];
  private _currentQuestionId: number;

  constructor(questions: QuizQuestion[]) {
    this._questions = questions.map(
      (question) => new Question(question, undefined),
    );
    this._currentQuestionId = -1;
  }

  getCurrentQuestionId(): number {
    return this._currentQuestionId;
  }

  getCurrentQuestion(): Question | null {
    return this._questions[this._currentQuestionId];
  }

  next(): Question {
    console.log("next");
    this._currentQuestionId = Math.min(
      this._currentQuestionId + 1,
      this._questions.length - 1,
    );
    return this.getCurrentQuestion()!;
  }

  prior(): Question {
    console.log("prior");
    this._currentQuestionId = Math.max(this._currentQuestionId - 1, 0);
    return this.getCurrentQuestion()!;
  }
}
