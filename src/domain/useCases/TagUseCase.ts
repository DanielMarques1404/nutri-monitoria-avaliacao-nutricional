import type { QuizTag } from "../../types/game";
import type { ITagRepository } from "../repositories/ITagRepository";

export class TagUseCase {
  private repository: ITagRepository;

  constructor(repository: ITagRepository) {
    this.repository = repository;
  }

  async listAll(): Promise<QuizTag[] | null> {
    return this.repository.list();
  }

  async create(tag: QuizTag): Promise<void> {
    return this.repository.create(tag);
  }
}
