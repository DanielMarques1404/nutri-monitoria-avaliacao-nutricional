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

  async listByQuestionnaireId(
    questionnaireId: number,
  ): Promise<IQuestion[] | null> {
    return this.repository.listByQuestionnaireId(questionnaireId);
  }

  async createOrUpdate(obj: IQuestion): Promise<number> {
    const questionId = await this.repository.createOrUpdate(obj);
    let persistedCorrectOptionId: number | null =
      obj.correctOption > 0 ? obj.correctOption : null;

    await this.tagsRepository.deleteByQuestionId(questionId);
    if (obj.tags) {
      await this.tagsRepository.create(
        questionId,
        obj.tags.map((t) => t.id),
      );
    }

    await this.optionsRepository.deleteByQuestionId(questionId);
    if (obj.options) {
      await Promise.all(
        obj.options.map(async (option) => {
          const persistedOptionId = await this.optionsRepository.create(
            option,
            questionId,
          );

          if (option.id === obj.correctOption) {
            persistedCorrectOptionId = persistedOptionId;
          }
        })
      );
    }

    await this.repository.updateCorrectOption(questionId, persistedCorrectOptionId);

    return questionId;
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
