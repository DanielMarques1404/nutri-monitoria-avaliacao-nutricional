import type { Category } from "../../types/game";
import type { ICategoryRepository } from "../repositories/ICategoryRepository";

export class CategoryUseCase {
  private repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  async listAll(): Promise<Category[] | null> {
    return this.repository.list();
  }

  async create(category: Category): Promise<void> {
    return this.repository.create(category);
  }
}
