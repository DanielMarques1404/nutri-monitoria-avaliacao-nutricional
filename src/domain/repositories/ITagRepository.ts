import type { Tag } from "../../types/game";

export interface ITagRepository {
  list(): Promise<Tag[] | null>;
  createOrUpdate(tag: Tag): Promise<void>;
  delete(id: number): Promise<void>;
}
