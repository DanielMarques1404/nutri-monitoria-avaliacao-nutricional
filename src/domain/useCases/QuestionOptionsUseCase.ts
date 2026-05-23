import type { IOption } from "../entities/entities";
import type { IQuestionOptionsRepository } from "../repositories/IQuestionOptionsRepository";

export class QuestionOptionsUseCase {
  private repository: IQuestionOptionsRepository;

  constructor(repository: IQuestionOptionsRepository) {
    this.repository = repository;
  }

  async listAll(): Promise<IOption[] | null> {
    return this.repository.list();
  }

  async listByQuestionId(questionId: number): Promise<IOption[] | null> {
    return this.repository.listByQuestionId(questionId);
  }

  async create(option: IOption, questionId: number): Promise<number> {
    return this.repository.create(option, questionId);
  }
}
