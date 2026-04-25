import type { Category } from "../../types/game";

export interface ICategoryRepository {
  list(): Promise<Category[] | null>;
  create(category: Category): Promise<void>;
}
