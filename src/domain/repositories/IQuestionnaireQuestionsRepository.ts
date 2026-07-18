import type { IQuestionnaireQuestion } from "../entities/entities";

export interface IQuestionnaireQuestionsRepository {
  listByQuestionnaireId(
    questionnaireId: number,
  ): Promise<IQuestionnaireQuestion[] | null>;
  create(questionnaireId: number, questionId: number): Promise<void>;
  delete(id: number): Promise<void>;
  deleteByQuestionnaireId(questionnaireId: number): Promise<void>;
  deleteByQuestionId(questionId: number): Promise<void>;
  deleteByQuestionnaireAndQuestion(
    questionnaireId: number,
    questionId: number,
  ): Promise<void>;
}
