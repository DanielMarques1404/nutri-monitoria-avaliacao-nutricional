import type { IQuestion } from "../entities/entities";
import type { IQuestionRepository } from "../repositories/IQuestionRepository";

export class QuestionUseCases {
  private repository: IQuestionRepository;

  constructor(repository: IQuestionRepository) {
    this.repository = repository;
  }

  async listAll(): Promise<IQuestion[] | null> {
    return this.repository.list();
  }

  async createOrUpdate(obj: IQuestion): Promise<void> {
    return this.repository.createOrUpdate(obj);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
