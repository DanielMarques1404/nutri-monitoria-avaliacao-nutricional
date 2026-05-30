import type { IQuestion } from "../../domain/entities/entities";
import type { IQuestionRepository } from "../../domain/repositories/IQuestionRepository";
import { supabase } from "./config";

export class QuestionSupabaseRepository implements IQuestionRepository {
  async listByQuestionnaireId(
    questionnaireId: number,
  ): Promise<IQuestion[] | null> {
    const { data, error } = await supabase
      .from("questionnaire_questions")
      .select("*, questions(*, question_tags(tags(*)), question_options(*))")
      .eq("questionnaire_id", questionnaireId);

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;
    const questions: IQuestion[] = data
      .map((q) => q.questions)
      .map((question) => this.transformToQuestion(question));

    return questions.sort((a: any, b: any) =>
      a.title.localeCompare(b.title),
    ) as IQuestion[];
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
          option: qo.option,
        })) || [],
      correctOption: question.correct_option || null,
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
      .select("*, question_tags(tags(*)), question_options(*)")
      .in("id", ids);

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;
    return data.map((question) => this.transformToQuestion(question)).sort((a, b) => a.title.localeCompare(b.title)) as IQuestion[];
  }

  async createOrUpdate(question: IQuestion): Promise<number> {
    if (question.id === 0) {
      const { id, options, tags, correctOption, categoryId, ...justAQuestion } = question;
      const dbQuestion = { ...justAQuestion, correct_option: correctOption, category_id: categoryId };
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
      const dbQuestion = { ...justAQuestion, correct_option: correctOption, category_id: categoryId };
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

  async delete(id: number): Promise<void> {
    console.log("deletando", id);
    throw new Error("Method not implemented.");
  }
}
