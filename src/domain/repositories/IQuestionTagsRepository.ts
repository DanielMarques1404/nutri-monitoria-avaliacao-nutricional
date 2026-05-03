export interface IQuestionTagsRepository {
  create(questionId: number, tagIds: number[]): Promise<void>;
  deleteByQuestionId(questionId: number): Promise<void>;
}
