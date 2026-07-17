import type {
  IQuestion,
  IQuestionnaire,
  IUrlQuestionnaire,
} from "../../domain/entities/entities";
import type { IQuestionnaireRepository } from "../../domain/repositories/IQuestionnaireRepository";
import { supabase } from "./config";

export class QuestionnaireSupabaseRepository implements IQuestionnaireRepository {
  private transformToUrls(urls: any[] | null | undefined): IUrlQuestionnaire[] {
    return (
      urls?.map((url) => ({
        id: url.id,
        questionnaireId: url.questionnaire_id,
        url: url.url,
      })) || []
    );
  }

  private transformToQuestion(question: any): IQuestion {
    return {
      id: question.id,
      title: question.title,
      statement: question.statement,
      question: question.question,
      options:
        question.question_options?.map((option: any) => ({
          id: option.id,
          questionId: option.question_id,
          description: option.description,
        })) || [],
      correctOption: question.correct_option || 0,
      explanation: question.explanation || "",
      categoryId: question.category_id || 0,
      difficulty: question.difficulty || "",
      tags:
        question.question_tags?.map((questionTag: any) => ({
          id: questionTag.tags.id,
          name: questionTag.tags.name,
        })) || [],
    };
  }

  async listActives(): Promise<IQuestionnaire[] | null> {
    const { data, error } = await supabase
      .from("questionnaires")
      .select(
        "id, name, description, active, questionnaire_questions(question_id), questionnaire_urls(id, questionnaire_id, url)",
      )
      .eq("active", true);

    if (error) throw error;

    if (!data) return null;

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description || "",
      active: item.active,
      questions: [],
      questionCount: item.questionnaire_questions.length,
      urls: this.transformToUrls(item.questionnaire_urls),
    }));
  }

  async listAll(): Promise<IQuestionnaire[] | null> {
    const { data, error } = await supabase
      .from("questionnaires")
      .select(
        "id, name, description, active, questionnaire_questions(question_id), questionnaire_urls(id, questionnaire_id, url)",
      )
      .order("name", { ascending: true });

    if (error) throw error;

    if (!data) return null;

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description || "",
      active: item.active,
      questions: [],
      questionCount: item.questionnaire_questions.length,
      urls: this.transformToUrls(item.questionnaire_urls),
    }));
  }

  async listById(id: number): Promise<IQuestionnaire | null> {
    const { data, error } = await supabase
      .from("questionnaires")
      .select(
        "id, name, description, active, questionnaire_urls(id, questionnaire_id, url), questionnaire_questions(questions(id, title, statement, question, explanation, difficulty, correct_option, category_id, question_tags(tags(id, name)), question_options(id, description, question_id)))",
      )
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;

    if (!data) return null;

    const questions =
      data.questionnaire_questions
        ?.map((item) => item.questions)
        .filter(Boolean)
        .map((question) => this.transformToQuestion(question)) || [];

    return {
      id: data.id,
      name: data.name,
      description: data.description || "",
      active: data.active,
      questions,
      questionCount: questions.length,
      urls: this.transformToUrls(data.questionnaire_urls),
    };
  }

  createOrUpdate(obj: IQuestionnaire): Promise<void> {
    throw new Error(`"Method not implemented." ${obj}`);
  }
  delete(id: number): Promise<void> {
    throw new Error(`"Method not implemented." ${id}`);
  }
}
