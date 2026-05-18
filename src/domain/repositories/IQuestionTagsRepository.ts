import type { ITag } from "../entities/entities";

export interface IQuestionTagsRepository {
  create(questionId: number, tagIds: number[]): Promise<void>;
  listByQuestionId(questionId: number): Promise<ITag[] | null>;
  deleteByQuestionId(questionId: number): Promise<void>;
}
