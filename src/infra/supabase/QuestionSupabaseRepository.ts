import type { IQuestion } from "../../domain/entities/entities";
import type { IQuestionRepository } from "../../domain/repositories/IQuestionRepository";
import { supabase } from "./config";

export class QuestionSupabaseRepository implements IQuestionRepository {
  async listByQuestionnaireId(
    questionnaireId: number,
  ): Promise<IQuestion[] | null> {
    const { data, error } = await supabase
      .from("questionnaire_questions")
      .select("questions(id, title, statement, question, explanation, difficulty, correct_option, category_id, question_tags(tags(id, name)), question_options(id, description, question_id))")
      .eq("questionnaire_id", questionnaireId)
      .order("title", { foreignTable: "questions", ascending: true });

    if (error) throw error;

    if (!data) return null;

    return data.map((q) => this.transformToQuestion(q.questions)) as IQuestion[];
  }

  private transformToQuestion(question: any): IQuestion {
    return {
      id: question.id,
      title: question.title,
      statement: question.statement,
      question: question.question,
      options:
        question.question_options?.map((qo: any) => ({
          id: qo.id,
          questionId: qo.question_id,
          description: qo.description,
        })) || [],
      correctOption: question.correct_option || 0,
      explanation: question.explanation || "",
      categoryId: question.category_id || 0,
      difficulty: question.difficulty || "",
      tags:
        question.question_tags?.map((qt: any) => ({
          id: qt.tags.id,
          name: qt.tags.name,
        })) || [],
    };
  }

  async listByIds(ids: number[]): Promise<IQuestion[] | null> {
    const { data, error } = await supabase
      .from("questions")
      .select("id, title, statement, question, explanation, difficulty, correct_option, category_id, question_tags(tags(id, name)), question_options(id, description, question_id)")
      .in("id", ids)
      .order("title", { ascending: true });

    if (error) throw error;

    if (!data) return null;

    return data.map((question) => this.transformToQuestion(question)) as IQuestion[];
  }

  async createOrUpdate(question: IQuestion): Promise<number> {
    if (question.id === 0) {
      const { id, options, tags, correctOption, categoryId, ...justAQuestion } = question;
      const dbQuestion = {
        ...justAQuestion,
        correct_option: correctOption > 0 ? correctOption : null,
        category_id: categoryId,
      };
      const { data, error } = await supabase
        .from("questions")
        .insert([dbQuestion as any])
        .select("id");

      if (error) {
        throw error;
      }

      return data[0].id;
    } else {
      const { options, tags, correctOption, categoryId, ...justAQuestion } = question;
      const dbQuestion = {
        ...justAQuestion,
        correct_option: correctOption > 0 ? correctOption : null,
        category_id: categoryId,
      };
      const { error } = await supabase
        .from("questions")
        .update(dbQuestion)
        .eq("id", question.id)
        .select();

      if (error) {
        throw error;
      }

      return question.id;
    }
  }

  async updateCorrectOption(
    questionId: number,
    correctOptionId: number | null,
  ): Promise<void> {
    const { error } = await supabase
      .from("questions")
      .update({ correct_option: correctOptionId })
      .eq("id", questionId);

    if (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from("questions").delete().eq("id", id);

    if (error) throw error;
  }
}
