import type { ICategory, ITag } from "../../domain/entities/entities";
import type { IQuestionnaireRepository } from "../../domain/repositories/IQuestionnaireRepository";
import type { IQuestionRepository } from "../../domain/repositories/IQuestionRepository";
import type { IQuestionTagsRepository } from "../../domain/repositories/IQuestionTagsRepository";
import type { IRepository } from "../../domain/repositories/IRepository";
import { REPOSITORY_SUPABASE } from "../../utils/data";
import { QuestionnaireSupabaseRepository } from "../supabase/QuestionnaireSupabaseRepository";
import { QuestionSupabaseRepository } from "../supabase/QuestionSupabaseRepository";
import { QuestionTagsSupabaseRepository } from "../supabase/QuestionTagsSupabaseRepository";
import { SupabaseRepository } from "../supabase/SupabaseRepository";

// Abstract Factory
interface IRepositoryFactory {
  createCategoryRepo(): IRepository<ICategory>;
  createTagRepo(): IRepository<ITag>;
  createQuetionsRepo(): IQuestionRepository;
  createQuestionTagsRepo(): IQuestionTagsRepository;
  createQuestionnaireRepo(): IQuestionnaireRepository;
}

// Fábrica concreta - Supabase
class SupabaseFactory implements IRepositoryFactory {
  createQuetionsRepo(): IQuestionRepository {
    return new QuestionSupabaseRepository();
  }
  createCategoryRepo(): IRepository<ICategory> {
    return new SupabaseRepository("Categories");
  }
  createTagRepo(): IRepository<ITag> {
    return new SupabaseRepository("Tags");
  }
  createQuestionTagsRepo(): IQuestionTagsRepository {
    return new QuestionTagsSupabaseRepository();
  }
  createQuestionnaireRepo(): IQuestionnaireRepository {
    return new QuestionnaireSupabaseRepository();
  }
}

// Próximas fábricas
class NotImplementedFactory implements IRepositoryFactory {
  createQuetionsRepo(): IQuestionRepository {
    throw new Error("Method not implemented.");
  }
  createCategoryRepo(): IRepository<ICategory> {
    throw new Error("Method not implemented.");
  }
  createTagRepo(): IRepository<ITag> {
    throw new Error("Method not implemented.");
  }
  createQuestionTagsRepo(): IQuestionTagsRepository {
    throw new Error('Not implemented yet')
  }
  createQuestionnaireRepo(): IQuestionnaireRepository {
    throw new Error('Not implemented yet')
  }
}

export class RepositoryFactory {
  static getRepo(type: number): IRepositoryFactory {
    if (type === REPOSITORY_SUPABASE) {
      return new SupabaseFactory();
    }
    return new NotImplementedFactory();
  }
}
