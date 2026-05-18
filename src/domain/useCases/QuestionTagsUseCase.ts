import type { ITag } from "../entities/entities";
import type { IQuestionTagsRepository } from "../repositories/IQuestionTagsRepository";

export class QuestionTagsUseCases {
  private repository: IQuestionTagsRepository;

  constructor(repository: IQuestionTagsRepository) {
    this.repository = repository;
  }

  async createOrUpdate(questionId: number, tagIds: number[]): Promise<void> {
    return this.repository.create(questionId, tagIds);
  }

  async listTagsByQuestionId(questionId: number): Promise<ITag[] | null> {
    return this.repository.listByQuestionId(questionId);
  }
}
