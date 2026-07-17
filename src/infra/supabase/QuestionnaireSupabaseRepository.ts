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

  private normalizeUrls(questionnaire: IQuestionnaire): IUrlQuestionnaire[] {
    const urlsByValue = new Map<string, IUrlQuestionnaire>();

    questionnaire.urls
      .map((item) => ({ ...item, url: item.url.trim() }))
      .filter((item) => item.url.length > 0)
      .forEach((item) => urlsByValue.set(item.url, item));

    return Array.from(urlsByValue.values());
  }

  private async replaceUrls(
    questionnaireId: number,
    urls: IUrlQuestionnaire[],
  ): Promise<void> {
    const { error: deleteError } = await supabase
      .from("questionnaire_urls")
      .delete()
      .eq("questionnaire_id", questionnaireId);

    if (deleteError) throw deleteError;

    if (urls.length === 0) return;

    const { error: insertError } = await supabase.from("questionnaire_urls").insert(
      urls.map((item) => ({
        questionnaire_id: questionnaireId,
        url: item.url,
      })),
    );

    if (insertError) throw insertError;
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

  async createOrUpdate(questionnaire: IQuestionnaire): Promise<void> {
    const urls = this.normalizeUrls(questionnaire);
    const dbQuestionnaire = {
      name: questionnaire.name,
      description: questionnaire.description || null,
      active: questionnaire.active,
    };

    if (questionnaire.id === 0) {
      const { data, error } = await supabase
        .from("questionnaires")
        .insert(dbQuestionnaire)
        .select("id")
        .single();

      if (error) throw error;

      await this.replaceUrls(data.id, urls);
      return;
    }

    const { error } = await supabase
      .from("questionnaires")
      .update(dbQuestionnaire)
      .eq("id", questionnaire.id);

    if (error) throw error;

    await this.replaceUrls(questionnaire.id, urls);
  }

  async delete(id: number): Promise<void> {
    const { error: urlsError } = await supabase
      .from("questionnaire_urls")
      .delete()
      .eq("questionnaire_id", id);

    if (urlsError) throw urlsError;

    const { error } = await supabase.from("questionnaires").delete().eq("id", id);

    if (error) throw error;
  }
}
