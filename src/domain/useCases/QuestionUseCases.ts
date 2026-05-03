import type { IQuestion } from "../entities/entities";
import type { IQuestionRepository } from "../repositories/IQuestionRepository";
import type { IQuestionTagsRepository } from "../repositories/IQuestionTagsRepository";

export class QuestionUseCases {
  private repository: IQuestionRepository;
  private tagsRepository: IQuestionTagsRepository;

  constructor(
    repository: IQuestionRepository,
    tagsRepository: IQuestionTagsRepository,
  ) {
    this.repository = repository;
    this.tagsRepository = tagsRepository;
  }

  async listAll(): Promise<IQuestion[] | null> {
    return this.repository.list();
  }

  async createOrUpdate(obj: IQuestion): Promise<void> {
    try {
      const questionId = await this.repository.createOrUpdate(obj);
      await this.tagsRepository.deleteByQuestionId(questionId);
      if (obj.tags)
        await this.tagsRepository.create(
          questionId,
          obj.tags.map((tag) => tag.id),
        );
    } catch (error) {
      console.error("Error in createOrUpdate:", error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error("Error in delete:", error);
      throw error;
    }
  }
}
