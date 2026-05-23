import type { IOption } from "../entities/entities";

export interface IQuestionOptionsRepository {
  list(): Promise<IOption[] | null>;
  listByQuestionId(questionId: number): Promise<IOption[] | null>;
  create(option: IOption, questionId: number): Promise<number>;
  deleteByQuestionId(questionId: number): Promise<void>;
}
