import type { IUrlQuestionnaire } from "../entities/entities";
import type { IQuestionnaireUrlsRepository } from "../repositories/IQuestionnaireUrlsRepository";

export class QuestionnaireUrlsUseCase {
  private repository: IQuestionnaireUrlsRepository;

  constructor(repository: IQuestionnaireUrlsRepository) {
    this.repository = repository;
  }

  async listByQuestionnaireId(
    questionnaireId: number,
  ): Promise<IUrlQuestionnaire[] | null> {
    return this.repository.listByQuestionnaireId(questionnaireId);
  }

  async createOrUpdate(url: IUrlQuestionnaire): Promise<void> {
    return this.repository.createOrUpdate(url);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }

  async deleteByQuestionnaireId(questionnaireId: number): Promise<void> {
    return this.repository.deleteByQuestionnaireId(questionnaireId);
  }
}
