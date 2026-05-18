import type { IQuestion } from "../../domain/entities/entities";
import type { IQuestionRepository } from "../../domain/repositories/IQuestionRepository";
import { supabase } from "./config";

export class QuestionSupabaseRepository implements IQuestionRepository {
  async listByQuestionnaireId(
    questionnaireId: number,
  ): Promise<IQuestion[] | null> {
    const { data, error } = await supabase
      .from("QuestionnaireQuestions")
      .select("*, Questions(*, QuestionTags(Tags(*)), QuestionOptions(*))")
      .eq("questionnaireId", questionnaireId)

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;
    const questions: IQuestion[] = data.map(q => q.Questions).map((question) =>
      this.transformToQuestion(question),
    );

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
        question.QuestionOptions?.map((qo: any) => ({
          id: qo.id,
          questionId: qo.questionId,
          description: qo.description,
        })) || [],
      correctOptionId: question.correctOptionId || 0,
      explanation: question.explanation || "",
      categoryId: question.categoryId || 0,
      difficulty: question.difficulty || "",
      tags:
        question.QuestionTags?.map((qt: any) => ({
          id: qt.Tags.id,
          name: qt.Tags.name,
        })) || [],
      summaryImage: question.summaryImage || "",
    };
  }

  async listByIds(ids: number[]): Promise<IQuestion[] | null> {
    const { data, error } = await supabase
      .from("Questions")
      .select("*, QuestionTags(Tags(*)), QuestionOptions(*)")
      .in("id", ids);

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;
    return data.map((question) => this.transformToQuestion(question));
  }

  async createOrUpdate(question: IQuestion): Promise<number> {
    if (question.id === 0) {
      const { id, options, tags, ...justAQuestion } = question;
      const { data, error } = await (supabase as any)
        .from("Questions")
        .insert([justAQuestion])
        .select("id");

      if (error) {
        throw error;
      }

      return data[0].id;
    } else {
      const { options, tags, ...justAQuestion } = question;
      const { error } = await supabase
        .from("Questions")
        .update(justAQuestion)
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
