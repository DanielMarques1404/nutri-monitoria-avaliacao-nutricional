import type { IQuestionnaireQuestion } from "../entities/entities";
import type { IQuestionnaireQuestionsRepository } from "../repositories/IQuestionnaireQuestionsRepository";

export class QuestionnaireQuestionsUseCase {
  private repository: IQuestionnaireQuestionsRepository;

  constructor(repository: IQuestionnaireQuestionsRepository) {
    this.repository = repository;
  }

  async listByQuestionnaireId(
    questionnaireId: number,
  ): Promise<IQuestionnaireQuestion[] | null> {
    return this.repository.listByQuestionnaireId(questionnaireId);
  }

  async create(questionnaireId: number, questionId: number): Promise<void> {
    return this.repository.create(questionnaireId, questionId);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }

  async deleteByQuestionnaireId(questionnaireId: number): Promise<void> {
    return this.repository.deleteByQuestionnaireId(questionnaireId);
  }

  async deleteByQuestionId(questionId: number): Promise<void> {
    return this.repository.deleteByQuestionId(questionId);
  }

  async deleteByQuestionnaireAndQuestion(
    questionnaireId: number,
    questionId: number,
  ): Promise<void> {
    return this.repository.deleteByQuestionnaireAndQuestion(
      questionnaireId,
      questionId,
    );
  }
}
