import type { IQuestion } from "../entities/entities";

export interface IQuestionRepository {
  list(): Promise<IQuestion[] | null>;
  createOrUpdate(question: IQuestion): Promise<number>;
  delete(id: number): Promise<void>;
}
