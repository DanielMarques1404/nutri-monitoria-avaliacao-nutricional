import type { IQuestionnaireRepository } from "../../domain/repositories/IQuestionnaireRepository";
import type { IQuestionTagsRepository } from "../../domain/repositories/IQuestionTagsRepository";
import { REPOSITORY_SUPABASE } from "../../utils/data";
import { QuestionnaireSupabaseRepository } from "../supabase/QuestionnaireSupabaseRepository";
import { QuestionTagsSupabaseRepository } from "../supabase/QuestionTagsSupabaseRepository";

// Abstract Factory
interface IRepositoryFactory {
  createTagRepo(): IQuestionTagsRepository;
  createQuestionnaireRepo(): IQuestionnaireRepository;
}

// Fábrica concreta - Supabase
class SupabaseFactory implements IRepositoryFactory {
  createTagRepo(): IQuestionTagsRepository {
    return new QuestionTagsSupabaseRepository();
  }
  createQuestionnaireRepo(): IQuestionnaireRepository {
    return new QuestionnaireSupabaseRepository();
  }
}

// Próximas fábricas
class NotImplementedFactory implements IRepositoryFactory {
  createTagRepo(): IQuestionTagsRepository {
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
