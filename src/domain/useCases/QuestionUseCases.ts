import type { IQuestion } from "../entities/entities";
import type { IQuestionOptionsRepository } from "../repositories/IQuestionOptionsRepository";
import type { IQuestionRepository } from "../repositories/IQuestionRepository";
import type { IQuestionTagsRepository } from "../repositories/IQuestionTagsRepository";

export class QuestionUseCases {
  private repository: IQuestionRepository;
  private tagsRepository: IQuestionTagsRepository;
  private optionsRepository: IQuestionOptionsRepository;

  constructor(
    repository: IQuestionRepository,
    tagsRepository: IQuestionTagsRepository,
    optionsRepository: IQuestionOptionsRepository,
  ) {
    this.repository = repository;
    this.tagsRepository = tagsRepository;
    this.optionsRepository = optionsRepository;
  }

  async listByQuestionnaireId(questionnaireId: number): Promise<IQuestion[] | null> {
    return this.repository.listByQuestionnaireId(questionnaireId);
  }

  async createOrUpdate(obj: IQuestion): Promise<void> {
    try {
      const questionId = await this.repository.createOrUpdate(obj);
      await this.tagsRepository.deleteByQuestionId(questionId);
      if (obj.tags) {
        await this.tagsRepository.create(
          questionId,
          obj.tags.map((tag) => tag.id),
        );
      }

      const correctOption = obj.options?.filter(op => op.id === obj.correctOptionId)
      const notCorrectOptions = obj.options?.filter(op => op.id !== obj.correctOptionId)
      await this.optionsRepository.deleteByQuestionId(questionId);
      if (obj.options) {
        // await this.optionsRepository.create()
        console.log(obj.options)
      }
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
