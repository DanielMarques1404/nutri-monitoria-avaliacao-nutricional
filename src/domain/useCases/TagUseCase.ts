import type { Tag } from "../../types/game";
import type { ITagRepository } from "../repositories/ITagRepository";

export class TagUseCase {
  private repository: ITagRepository;

  constructor(repository: ITagRepository) {
    this.repository = repository;
  }

  async listAll(): Promise<Tag[] | null> {
    return this.repository.list();
  }

  async createOrUpdate(tag: Tag): Promise<void> {
    return this.repository.createOrUpdate(tag);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
