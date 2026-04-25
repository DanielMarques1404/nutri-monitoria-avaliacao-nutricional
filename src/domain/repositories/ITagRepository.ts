import type { Tag } from "../../types/game";

export interface ITagRepository {
  list(): Promise<Tag[] | null>;
  create(tag: Tag): Promise<void>;
}
